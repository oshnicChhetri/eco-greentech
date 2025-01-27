import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.models.js";

export const userOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch orders and sort them by createdAt in descending order (latest orders first)
    const userOrders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    const detailedOrder = await Promise.all(
      userOrders.map(async (order) => {
        const productDetails = await Promise.all(
          order.products.map(async ({ product, quantity }) => {
            const products = await Product.findById(product);

            return {
              productId: product,
              name: products?.productName || "Product not found",
              price: products?.price || 0,
              quantity: quantity,
            };
          })
        );

        return {
          orderId: order._id,
          products: productDetails,
          totalAmount: order.totalAmount,
          status: order.orderStatus,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders: detailedOrder,
    });
  } catch (error) {
    console.log("Error in get order", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const { orderStatus } = req.body;

    // Validate request body
    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true } // Return the updated document
    );

    // Handle case where order is not found
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: {
        id: updatedOrder._id,
        orderStatus: updatedOrder.orderStatus,
      },
    });
  } catch (error) {
    console.log("Error in update order status:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    // Fetch all orders and sort by createdAt in descending order (latest first)
    const orders = await Order.find({}).sort({ createdAt: -1 });

    // Fetch details for each order
    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        // Find the user associated with the order
        const user = await User.findById(order.user);

        // Find details for each product in the order
        const productDetails = await Promise.all(
          order.products.map(async ({ product, quantity, amount }) => {
            const products = await Product.findById(product);
            return {
              productId: product,
              name: products?.productName || "Product not found",
              price: products?.price || 0,
              quantity,
              amount,
            };
          })
        );

        return {
          OrderId: order._id,
          products: productDetails,
          totalAmount: order.totalAmount,
          status: order.orderStatus,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          userEmail: user?.userEmail || "Email not available", // Handle case where user is not found
          userAddress: user?.userAddress || "Address not available",
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders: orderDetails,
    });
  } catch (error) {
    console.log("Error in getAllProducts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
