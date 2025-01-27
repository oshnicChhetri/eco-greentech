import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaHandHoldingHeart, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaymentSucess from "../hooks/usePaymentSucess";

const PurchaseSucess = () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");
      const { loading, orderDetail } = usePaymentSucess({ sessionId });

      if (loading) {
            return <p>Loading order details...</p>;
      }

      if (!orderDetail || Object.keys(orderDetail).length === 0) {
            return <p>No order details found. Please check your session or try again later.</p>;
      }

      return (
            <div className="purchaseSucessContainer">
                  <IoMdCheckmarkCircleOutline className="checkIcon" />
                  <h1>Purchase Successful</h1>
                  <h2>Thank you for your purchase. We are processing it now.</h2>

                  <div className="purchaseSucessOrderDetails">
                        <section>
                              <p>Order Number: </p> <span>{orderDetail.orderId}</span>
                        </section>

                        <section>
                              <p>Estimated Delivery: </p> <span>5 to 7 business days</span>
                        </section>
                  </div>

                  <div className="purchaseSucessThanks">
                        <FaHandHoldingHeart /> <p>Thanks for trusting us!</p>
                  </div>

                  <Link className="purchaseLink" to="/">
                        <div className="PurchaseSucessContinueShopping">
                              <p>Continue Shopping</p> <FaArrowRight />
                        </div>
                  </Link>
            </div>
      );
};

export default PurchaseSucess;
