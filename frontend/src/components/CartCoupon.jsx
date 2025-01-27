import { useState } from "react";

const CartCoupon = ({ coupon, couponLoading, validateCoupon }) => {
    const [code, setCode] = useState("");
   

    const handleCouponValidation = async () => {
        if (!code) {
            
            return;
        }
    
        // Reset success message

        await validateCoupon({code});
        setCode("");

       
    };

    return (
        <div className="couponCode">
            <h2>Coupon:</h2>
            <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                placeholder="Enter coupon code"
            />

            {/* Display coupon code and discount if valid */}
            {coupon && (
                <>
                    <span>Coupon Code:</span>
                    <p className="coupon-discount">{coupon.code}</p>
                </>
            )}

            {/* Show Loading state */}
            {couponLoading && <div className="loading">Validating coupon...</div>}

            
            <button onClick={handleCouponValidation} className="applyCoupon" disabled={couponLoading}>
                Apply Coupon
            </button>
        </div>
    );
};

export default CartCoupon;
