import  { useEffect } from "react";
import CartItem from "../components/CartItem.jsx";
import CartOrderSummary from "../components/CartOrderSummery.jsx"; 
import CartCoupon from "../components/CartCoupon";
import useCart from "../hooks/useCart.js";
import useCoupon from "../hooks/useCoupen.js";

const Cart = () => {
  const { loading,cartItems, updateQuantity, deleteCartItem } = useCart();
  const {couponloading, coupon,validatedCoupon, validateCoupon} = useCoupon();
  
  
 

  return (
    
    <div className="cartContainer">
      <div className="cartItemsContainer">
        {loading ? (
          <div className="message">Loading cart items...</div>
        ) : cartItems.length === 0 ? (
          <div className="message">No cart items available</div>
        ) : (
          
            cartItems.map((cartItem) => (

              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                onQuantityChange={(newQuantity) => updateQuantity(cartItem._id, newQuantity)}
                onDelete={() => deleteCartItem(cartItem._id)}
              />
             

            ))
          
          
          
        )}
      </div>

      <div className="cartOrderAndCouponContainer">
        
        <CartOrderSummary cartItems={cartItems} validatedCoupon={validatedCoupon} />
        <CartCoupon  couponloading={couponloading} coupon={coupon} validateCoupon={validateCoupon}/>
      </div>
    </div>
  );
};

export default Cart;
