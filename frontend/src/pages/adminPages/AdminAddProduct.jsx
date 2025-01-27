import  { useState } from "react";
import useAddProduct from "../../hooks/useAddProduct";
import { FaSpinner } from "react-icons/fa";

const categories = [
  "Phones",
  "Consoles",
  "Laptops",
  "Computers",
  "Headphones",
  "Cameras",
  "Smartwatches",
  "Tablets",
];

const AdminAddProduct = () => {

  const {loading,addProduct} = useAddProduct();
  const [inputs, setInputs] = useState({
    productName: "",
    description: "",
    price: "",
    image: null,
    category: "",
    stock: "",
  });


  const handleImageChange = (e) =>{

    const file = e.target.files[0];

    if(file){
      const reader = new FileReader(file);

      reader.onloadend = () =>{
        setInputs({ ...inputs, image: reader.result})
      }

      reader.readAsDataURL(file);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProduct(inputs);
    setInputs({
      ...inputs, productName:"", description: "", price:"", image:null, category:"", stock:""
    })
    

  };

  return (
    <div className="formContainer">
      <h1 className="formH1">Add Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={inputs.productName}
          onChange={(e) =>
            setInputs({ ...inputs, productName: e.target.value })
          }
          required
          className="formInput"
        />

        {/* Description */}
        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="description"
          value={inputs.description}
          onChange={(e) =>
            setInputs({ ...inputs, description: e.target.value })
          }
          rows="4"
          required
          className="formInput"
        ></textarea>

        {/* Price */}
        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="price"
          step="0.01"
          value={inputs.price}
          onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          required
          className="formInput"
        />

        {/* Stock */}
        <label htmlFor="productStock">Stock:</label>
        <input
          type="number"
          id="productStock"
          name="stock"
          value={inputs.stock}
          onChange={(e) => setInputs({ ...inputs, stock: e.target.value })}
          required
          className="formInput"
        />

        {/* Category */}
        <label htmlFor="productCategory">Category:</label>
        <select
          id="productCategory"
          name="category"
          value={inputs.category}
          onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
          required
          className="formInput"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Image */}
        <label htmlFor="productImage">Product Image:</label>
        <input
          type="file"
          id="productImage"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="formInput"
        />

        {/* Submit Button */}
        <button type="submit" className="submitButton">
          {loading ? (
            <FaSpinner className="spinnerIcon" />
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
