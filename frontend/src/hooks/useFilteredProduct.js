import { useState,useEffect } from "react";

import toast from "react-hot-toast";

const useFilteredProduct = ({query}) => {
    
    const [filteredProductLoading, setFilteredProductLoading] = useState(false);
    const [filteredProduct, setFilteredProduct] = useState([]);

    useEffect(() => {
       setFilteredProductLoading(true); 
            try{
                const getFilteredProduct = async () => {
                    
                    const res = await fetch(`/api/products/filteredProducts/${query}`)
                    const data = await res.json();
                    
                    if(data.error){
                        throw new Error(data.error);
                    
                    }
                    setFilteredProduct(data);
                }
                getFilteredProduct();
        
    }catch(error){
        toast.error(error.message); 
    }finally{
        setFilteredProductLoading(false);
    }
},[query]);
  
    
    return { filteredProductLoading,  filteredProduct };
}

export default useFilteredProduct