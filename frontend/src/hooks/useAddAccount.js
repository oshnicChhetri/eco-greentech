import { useState } from "react";
import toast from "react-hot-toast";

const useAddAccount = () => {
  const [loading, setLoading] = useState(false);

  const addAccount = async ({
    fullName,
    userEmail,
    userRole,
    password,
    confirmPassword,
    state,
    city,
    street,
    houseNumber,
    postalCode,
  }) => {
    // Perform input validation
    const success = handleInputsErrors({
      fullName,
      userEmail,
      userRole,
      password,
      confirmPassword,
      state,
      city,
      street,
      houseNumber,
      postalCode,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/createAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userEmail,
          userRole,
          password,
          confirmPassword,
          state,
          city,
          street,
          houseNumber,
          postalCode,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addAccount };
};

export default useAddAccount;

// Input validation for all fields
function handleInputsErrors({
  fullName,
  userEmail,
  userRole,
  password,
  confirmPassword,
  state,
  city,
  street,
  houseNumber,
  postalCode,
}) {
  if (
    !fullName ||
    !userEmail ||
    !userRole ||
    !password ||
    !confirmPassword ||
    !state ||
    !city ||
    !street ||
    !houseNumber ||
    !postalCode
  ) {
    toast.error("Please fill in all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must have at least 6 characters");
    return false;
  }

  // You can also add additional validation for postal code, city, or any other fields as needed

  return true;
}
