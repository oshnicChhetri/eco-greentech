import { useState,useEffect } from "react";
import { toast } from "react-hot-toast";

const useGetAdminProducts = () =>{

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        const getProducts = async() =>{
            setLoading(true);

            try {

                const res = await fetch("/api/products/");
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error)
                }
                setProducts(data);
                
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false);
            }
        }

        getProducts();
    },[]);






    return {loading,products,setProducts};

 }


 export default useGetAdminProducts;