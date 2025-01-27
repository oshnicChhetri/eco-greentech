import { useState, useEffect } from "react";
import usePayment from "../hooks/usePayment";

const CartOrderSummery = ({ cartItems, validatedCoupon }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);

  const { loading, payment } = usePayment();
console.log(validatedCoupon);
  const handlePayment = async () => {
    await payment({ cartItems, validatedCoupon });
  };

  useEffect(() => {
    // Calculate the original total amount without any discount
    const original = cartItems.reduce((amount, cartItem) => {
      return amount + Math.round(cartItem.price * cartItem.quantity * 100) / 100;
    }, 0);

    // Calculate the discount amount (if any) and apply it to the original amount
    const discount = validatedCoupon?.discountPercentage || 0;
    const discountedAmount = original - (original * (discount / 100));

    // Set the state with the calculated values
    setOriginalAmount(original);
    setTotalAmount(discountedAmount);
  }, [cartItems, validatedCoupon]); // Recalculate when cartItems or validatedCoupon changes

  return (
    <div className="orderSummary">
      <p>
        Total Amount: <span className="totalAmount">{`£${totalAmount.toFixed(2)}`}</span>
      </p>
      <p>
        Original Amount: <span className="originalAmount">{`£${originalAmount.toFixed(2)}`}</span>
      </p>
      {
        
        validatedCoupon.discountPercentage && (
          <>
        
           <hr />

          <p>{validatedCoupon.discountPercentage}% discount applied</p>  
          </>
        )
      }
     
    
      <button onClick={handlePayment} className="checkoutButton">
        Checkout
      </button>
    </div>
  );
};

export default CartOrderSummery;
