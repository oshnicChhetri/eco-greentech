import { IoCartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useGetCategorizedProduct from "../hooks/useGetCategorizedProduct";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { LuNavigation } from "react-icons/lu";
const CategoryProduct = () => {
  const { category } = useParams();
  const { loading, products } = useGetCategorizedProduct(category);



  return (
    <div  className="categoryProductContainer">
      {loading ? (
        <div className="message">Loading products...</div>
      )  : products.length === 0 ? (
        <div className="message">No products available</div>
      ) : (
        products.map((product) => 
          
            <Product key={product._id} product={product} />
              
        
      )
      )}
    </div>
  );
};

export default CategoryProduct;
