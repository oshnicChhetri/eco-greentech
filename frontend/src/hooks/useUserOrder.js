import {useState, useEffect} from 'react';
import toast from 'react-hot-toast';


const useUserOrder = () => {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect( ()=>{
        setLoading(true);
        const userOrder = async()=>{
            try{
                const res = await fetch("/api/order");
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setOrders(data.orders);
            }catch(error){
               toast.error(error.message);
            }finally{
                setLoading(false);
            }

        }
        userOrder();



    },[])

       return { loading, orders };
 
};

export default useUserOrder;