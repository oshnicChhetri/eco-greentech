import { useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QToTbRpt1ThAndRX5cd2Gb9lfXy0gASybzew9nXYlfYoW0U9z0e5RCLPgvLR9BiW6UnCb0IrkGi0Bmi2vCLdWU200lCCSjOGr"
);

const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const payment = async ({ cartItems , validatedCoupon}) => {
    
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItems, couponCode: validatedCoupon.code }),
      });

      const data = await res.json();
      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
return result;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, payment };
};

export default usePayment;
