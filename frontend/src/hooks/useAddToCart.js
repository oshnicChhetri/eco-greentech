import {useState, useEffect} from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const useAddToCart = () =>{

const [loading, setLoading] = useState(false);

const addToCart = async({productId})=>{

 setLoading(true);
    try {

        const res =  await fetch("/api/cart/",{
        method : "POST",
        headers : {"Content-type": "application/json"},
        body : JSON.stringify({
        productId
        })}
    )

    const data = await res.json();

    if(data.error){
        throw new Error(data.error);
    }else{
        toast.success("Product added to cart sucessfully");
    }
        
    } catch (error) {
        toast.error(error.message);
    }
    finally{

   
        setLoading(false)
     }

   

    
}

return {loading, addToCart}

}

export default useAddToCart;