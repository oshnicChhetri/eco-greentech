import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useCoupon = () => {
  const [couponLoading, setCouponLoading] = useState(false);
  const [validatedCoupon, setValidatedCoupon] = useState({});
  const [coupon, setCoupon] = useState(null);

  // Fetching coupon data on component mount
  useEffect(() => {
    const getCoupon = async () => {
      setCouponLoading(true);
      try {
        const res = await fetch("/api/coupon/");
        const data = await res.json();

        // Check if response was successful
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch coupon data");
        }
        setCoupon(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setCouponLoading(false);
      }
    };

    getCoupon();

    // Cleanup function for component unmount
    return () => {
      setCouponLoading(false); // Clean up loading state
    };
  }, []); // Empty dependency array means it runs only once on mount

  // Validate coupon on submission
  const validateCoupon = async ({ code }) => {
    console.log(code);

    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.message );
      }
      if(data.code){
        setValidatedCoupon(data);
     toast.success("Coupon is valid");
      }

      // Store validated coupon details
      

      return data; // Return coupon details for further use if needed
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setCouponLoading(false); // Stop loading state after validation
    }
  };

  return { couponLoading, coupon, validatedCoupon, validateCoupon };
};

export default useCoupon;
