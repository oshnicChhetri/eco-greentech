import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateOrderStatus = () => {
  const [statusLoading, setStatusLoading] = useState(false);
  

  const updateStatus = async (orderId, status, setAllOrders) => {
    setStatusLoading(true);
   

    try {
      // Assuming you have an API endpoint to update the status of an order
      const res = await fetch(`/api/order/${orderId}`, {
        method: "PUT", // Update request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: status }),
      });

      

      const data = await res.json();
      if(data.error){
        throw new Error(data.error);

      }else{
        toast.success("Status Updated Sucessfully")
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.OrderId === orderId ? { ...order, status } : order
          )
        );

      }

      
    
    } catch (error) {
 toast.error(error.message)
    } finally {
      setStatusLoading(false);
    }
  };

  return { statusLoading, updateStatus };
};

export default useUpdateOrderStatus;
