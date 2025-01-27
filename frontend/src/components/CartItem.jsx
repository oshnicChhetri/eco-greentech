import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";


const CartItem = ({cartItem, onQuantityChange,onDelete}) => {

    // const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);
    // const {loading,updateCartQuantity} = useUpdateCartQuantity();
    const handleIncrement = () =>{
        onQuantityChange(cartItem.quantity + 1)
    }

    const handleDecrement = () =>{
        if (cartItem.quantity > 1) {
            onQuantityChange(cartItem.quantity - 1); // Prevent quantity from dropping below 1
        }
    }

    const handleDelete = () =>{
        onDelete()
    }

    

   

  return (
      <div className="cartItem">
        

         <div className='cartItemImageContainer'>
            <img src={cartItem.image} alt="Cart Item" className="cart-item-image" />
         </div>
              

              <div className="cartItemDetails">
                  <p className="cartItemName">{cartItem.productName}</p>
                  <p className="cartItemPrice">{cartItem.price}</p>
              </div>
              <div className="cartItemQuantity">
              <FiMinusCircle className="cartItemQuantityButton" 
              onClick={handleDecrement}
              />
              
                  <h1>{cartItem.quantity}</h1>
             
              <FiPlusCircle className="cartItemQuantityButton"
             onClick={handleIncrement}
               />
              </div>
          <FaRegTrashAlt className="cartItemDelete"
          onClick={handleDelete}
           />
         
      </div>
  )
}

export default CartItem