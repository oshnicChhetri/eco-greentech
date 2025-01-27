import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useCart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  

  // Only fetch cart data once when the component mounts
  useEffect(() => {
    
    const getCart = async () => {
      try {
        const response = await fetch("/api/cart/");
        const data = await response.json();
        setCartItems(data || []); // If no data is returned, use an empty array
      } catch (error) {
        toast.error(error.message); // Show error toast on failure
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getCart();
  }, []); // Empty array ensures this effect runs only once on mount

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();

      if(data.error){
        throw new Error(data.error)
      }
       
      
      setCartItems((prevItems) => {
        return prevItems.map((item) => {
          if (item._id === itemId) {
            
              return { ...item, quantity: quantity}
             // Update the matched item
          }
          return item; // Return the original item for all others
        });
      });
    } catch (error) {
      toast.error(error.message); // Show error toast on failure
    }
  };
  const deleteCartItem = async (itemId) => {
    
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success("Item removed successfully");
        setCartItems((prevItems)=>{
          return prevItems.filter((item) => item._id !== itemId)
        })
      }
    } catch (error) {
      toast.error(error.message); // Show error toast on failure
    } 
  };

  return { loading, cartItems, updateQuantity, deleteCartItem };
};

export default useCart;
