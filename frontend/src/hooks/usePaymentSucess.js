import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const usePaymentSucess = ({ sessionId }) => {
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState({});
  const hasFetched = useRef(false); // Prevent the API call from being made more than once

  useEffect(() => {
    // Ensure the sessionId is present and the API call hasn't already been triggered
    if (!sessionId || hasFetched.current) return;

    hasFetched.current = true; // Mark the request as made

    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/payment/checkout-sucess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setOrderDetail(data); // Set the order detail after successful API call
      } catch (error) {
        toast.error(error.message); // Handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(); // Call the function once
  }, [sessionId]); // Re-run if sessionId changes

  return { loading, orderDetail };
};

export default usePaymentSucess;
