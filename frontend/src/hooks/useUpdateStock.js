import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useUpdateStock = () => {
    const [stockloading, setStockLoading] = useState(false);

    const updateStock = async ({id, stock,setProducts}) => {
        setStockLoading(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stock }),
            });
            const data = await res.json()
            if(data.error) {
               throw new Error(res.error);
            }
       setProducts((prevProducts) =>
         prevProducts.map((product) =>
           product._id === id ? { ...product, stock: parseInt(stock) } : product
         )
       );
            toast.success("Stock updated successfully");


           
        } catch (error) {
            toast.error(error.message); // Show error toast on failure
        } finally {
            setStockLoading(false);
        }
    };

    return {stockloading, updateStock};
};

export default useUpdateStock;
