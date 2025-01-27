import useGetAllOrders from "../../hooks/useGetAllOrders";
import { useState } from "react";
import useUpdateOrderStatus from "../../hooks/useUpdateOrderStatus";

const AdminOrders = () => {
  const { loading, allOrders, setAllOrders } = useGetAllOrders();
  console.log(allOrders);

  // State to track visible address and selected status
  const [visibleAddress, setVisibleAddress] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const { statusLoading,updateStatus} = useUpdateOrderStatus();
  

  // Function to toggle address visibility
  const toggleAddress = (index) => {
    setVisibleAddress((prevState) => (prevState === index ? null : index));
  };

  // Handle status change
  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [orderId]: status,
    }));
    // You can add logic here to send the updated status to the server
    console.log(`Updated Order ${orderId} status to ${status}`);
  };

  const handleUpdateStatus = async(orderId, status,) =>{
 await updateStatus(orderId,status,setAllOrders)
  }

  return (
    <div className="userOrdersContainer">
      {loading && <p>Loading orders...</p>}
      {!allOrders || allOrders.length === 0 ? <p>No orders found.</p> : null}
      {allOrders &&
        allOrders.map((order, index) => (
          <div key={order.OrderId} className="userOrderItem">
            {/* Order ID */}
            <p className="userOrderId">Order ID: {order.OrderId}</p>

            {/* Order Status */}
            <div className="orderStatus">
              <span>Status:</span> <span>{order.status.toUpperCase()}</span>
            </div>

           
           

              {order.status !== "delivered" && (
              <div className="update-status-container">
                <select
                  className="update-status-dropdown"
                  value={selectedStatus[order.OrderId] || order.status}
                  onChange={(e) =>
                    handleStatusChange(order.OrderId, e.target.value)
                  }
                >
                  <option value="preparing">Preparing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  className="update-status-btn"
                  onClick={() => handleUpdateStatus(order.OrderId, selectedStatus[order.OrderId] || order.status)}
                  disabled={statusLoading}
                >
                  Update Status
                </button>
              </div>
              )}
              
           

            {/* Total Amount */}
            <div className="totalAmount">
              <span>Total Amount:</span> <span className="amount">£{order.totalAmount.toFixed(2)}</span>
            </div>

            {/* User Email */}
            <div className="userEmail">
              <span>User Email:</span>  <span className="email">{order.userEmail}</span> 
            </div>

            {/* Collapsible Address */}
            <div className="userAddress">
              <span className="addressLabel">Address:</span>
              <button
                className="toggleAddressBtn"
                onClick={() => toggleAddress(index)}
              >
                {visibleAddress === index ? "Hide Address" : "Show Address"}
              </button>
              <div
                className={`addressDetails ${visibleAddress === index ? "show" : ""}`}
              >
               

                <p>State : <span>{order.userAddress.state}
                  </span></p>
                <p>City:  <span>{order.userAddress.city} </span></p>
                <p>Postal Code :  <span>{order.userAddress.postalCode}</span></p>
                <p>Street : <span>{order.userAddress.street} </span></p>
                <p>House Number :  <span>{order.userAddress.houseNumber}</span></p>
              </div>
            </div>

            {/* Order Products */}
            <div className="orderProductDetails">
              {order.products && order.products.length > 0 ? (
                order.products.map((product) => (
                  <div key={product.productId} className="productItem">
                    <div className="productDetails">
<div className="productDetailName">Product Name: {product.name}</div>
                    <div className="productDetailPrice">Price: ${product.price}</div>
                    <div className="productDetailQuantity">Quantity: {product.quantity}</div>
                    </div>
                    
                  </div>
                ))
              ) : (
                <p>No products in this order.</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminOrders;
