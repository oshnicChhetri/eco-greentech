import React from "react";
import useUserOrder from "../hooks/useUserOrder";

const UserOrder = () => {
    const { loading, orders } = useUserOrder();

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (!orders || orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div className="userOrdersContainer">
            {orders.map((order) => (
                <div key={order.orderId} className="userOrderItem">
                    {/* Order ID */}
                    <p className="userOrderId">Order ID: {order.orderId}</p>

                    {/* Product details */}
                    <div className="orderProductDetails">
                        {order.products.map((product) => (
                            <div key={product.productId} className="productItem">
                                <div>
                                    <span className="productDetailName">Product Name:</span> {product.name}
                                </div>
                                <div>
                                    <span className="productDetailPrice">Price:</span> £{product.price}
                                </div>
                                <div>
                                    <span className="productDetailQuantity">Quantity:</span> {product.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Status */}
                    <p className="orderStatus">
                        <span>Status:</span> {order.status}
                    </p>

                    {/* Total Amount */}
                    <p className="totalAmount">
                        <span>Total Amount:</span> 
                        £{order.totalAmount}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default UserOrder;
