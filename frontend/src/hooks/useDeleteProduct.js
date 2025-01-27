import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const deleteProduct = async ({id, setProducts}) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        // Update the product list by filtering out the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { deleteProduct };
};

export default useDeleteProduct;
