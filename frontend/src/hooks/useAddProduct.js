import { useState } from "react";
import { toast } from "react-hot-toast";

const useAddProduct =  () =>{

    const [loading,setLoading] = useState(false);
    
    const addProduct = async({productName, description, price, image, category, stock})=>{

        setLoading(true);

        try{

            const res = await fetch("/api/products/",{
                method: "POST",
                headers: {"Content-Type" :"application/json"},
                body: JSON.stringify({
                    productName,
                    description,
                    price,
                    image,
                    category,
                    stock
                })
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

                toast.success("Product Added Succesfully");
            

        }catch(error){
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return {loading, addProduct}

}

export default useAddProduct;


