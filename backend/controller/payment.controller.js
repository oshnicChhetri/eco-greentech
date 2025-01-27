
import { stripe } from "../db/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.models.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // send as cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.productName,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-sucess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },
    });

    if (totalAmount >= 10000) {
      await createCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error in create checkout session:", error.message);
    res.status(500).json({ messaage: "Internal server error" });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}

export const checkoutSucess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    // Check if the order with this sessionId already exists
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });

    if (existingOrder) {
      return res
        .status(400)
        .json({ error: "Order already created for this session." });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session Metadata:", session.metadata); // For debugging

    if (session.payment_status === "paid") {
      // Handle coupon deactivation if necessary
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          {
            isActive: false,
          }
        );
      }

      // Safely parse products
      let products = [];
      try {
        if (session.metadata.products) {
          products = JSON.parse(session.metadata.products); // Parse stringified JSON
        } else {
          throw new Error("Product data is missing or invalid.");
        }
      } catch (error) {
        console.error("Error parsing products:", error.message);
        return res
          .status(400)
          .json({ error: "Invalid or missing product data" });
      }

      // Create new order
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100, // Amount in dollars
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      await User.findByIdAndUpdate(session.metadata.userId, {
        $set: { cartItems: [] }, // Empty the user's cart
      });

      // Update product stock
      await Promise.all(
        products.map((product) =>
          Product.findByIdAndUpdate(
            product.id,
            { $inc: { stock: -product.quantity } },
            { new: true }
          )
        )
      );

      // Respond with success
      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, stock updated, and coupon deactivated",
        orderId: newOrder._id,
        totalAmount: newOrder.totalAmount,
      });
    } else {
      return res.status(400).json({ error: "Payment was not successful" });
    }
  } catch (error) {
    console.error("Error in checkout success:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
