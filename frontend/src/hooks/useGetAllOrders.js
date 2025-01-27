

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetAllOrders = () => {
const [loading, setLoading] = useState(true);
const [allOrders, setAllOrders] = useState([]);


useEffect(() => {
    const fetchAllOrders = async () => {
        setLoading(true);   
        try {
            const res = await fetch("/api/order/all");
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setAllOrders(data.orders);
           
        } catch (error) {
        toast.error(error.message);
        }finally{
            setLoading(false);
        }
           
    };

    fetchAllOrders();
}, []);

return { loading, allOrders, setAllOrders };

};

export default useGetAllOrders;