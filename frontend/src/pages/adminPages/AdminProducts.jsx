import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import useGetAdminProducts from "../../hooks/useGetAdminProducts";
import { useState } from "react";
import { Link } from "react-router-dom";
import useUpdateStock from "../../hooks/useUpdateStock";
import useDeleteProduct from "../../hooks/useDeleteProduct";

const AdminProducts = () => {
  const { loading, products ,setProducts} = useGetAdminProducts();
  const {stockloading,updateStock} = useUpdateStock();
  const {deleteProduct} = useDeleteProduct();
  
  const [stock, setStock] = useState(null); // Track updated stock values
  
const handleUpdateStock = (id) =>{
  updateStock({id,stock,products,setProducts});
  setStock(null);
}

const handleDeleteProduct = (id) =>{ 
  deleteProduct({id,setProducts});
}








  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  

  

  return (
    <div className="adminProductsContainer">
      {products.length === 0 ? (
        <div className="message">No products available</div>
      ) : (
        products.map((product) => (
          <div key={product._id} className="adminProductItem">
            <Link  className="adminProductLink" to={`/product/${product._id}`}>
              <img className="productImage" src={product.image} alt="mainLogo" />
            </Link>
            

            <div className="productItem adminProducName">{product.productName}</div>

            <div className="productItem price">
              <span>Price: </span>
              {product.price}
            </div>

            

            <div className="productItem adminCategory">
              <span>Category: </span>
              {product.category}
            </div>

           
             
            
           

            <div className="productItem stocks">
              <div>
                <span>Stocks: </span> {product.stock}
              </div>
             <div>

           
              <input
                type="number"
                className="stockInput"
                onChange={(e) => setStock(e.target.value)}
              />
              <button
                className="updateStockButton"
                onClick={() => handleUpdateStock(product._id)}
              >
                Update
              </button> 
               </div>

            </div>
            
              <FaRegTrashAlt className="deleteLogo"  onClick={()=>{
                handleDeleteProduct(product._id)
              }}/>
            
          </div>
        ))
      )}
    </div>
  );
};

export default AdminProducts;
