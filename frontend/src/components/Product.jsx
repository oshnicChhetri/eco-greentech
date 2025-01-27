import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAddToCart from "../hooks/useAddToCart";
import { FaSpinner } from "react-icons/fa";
import { UseAuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const Product = ({ product }) => {
  const { loading, addToCart } = useAddToCart();
 const { authUser } = UseAuthContext();

    const handleAddToCart = async (productId) => {
        if (!authUser) {
            toast.error("Please login to add products to cart.");
            return;
        } else {
            await addToCart(productId)
            toast.success("Product added to cart.");
        }

    };

  return (
    <div key={product._id} className="categoryProduct">
      <Link to={`/product/${product._id}`} className="categoryLink">
        <div className="categoryProductImageContainer">
          <img className="categoryProductImage" loading="lazy" src={product.image} alt={product.productName} />
        </div>
      </Link>

      <div className="categoryProductDetailContainer">
        <div className="categoryProductDetailContainerText">
          <p >{product.productName}</p>
          <p className="categoryProdcutPrice">{`${product.price}£`}</p>
        </div>

              <div
                  className="cartButtonContainer"
                  onClick={() => !loading && handleAddToCart(product._id)} // Prevent click when loading
              >
                  {loading ? (
                      <FaSpinner className="spinnerIcon" />
                  ) : (
                      <IoCartOutline className="cartButton" />
                  )}
              </div>


      </div>
    </div>
  );
};

export default Product;
