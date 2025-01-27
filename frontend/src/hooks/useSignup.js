import { useState } from "react";
import { toast } from "react-hot-toast";
import { UseAuthContext } from "../../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = UseAuthContext();

  const signup = async ({
    fullName,
    userEmail,
    password,
    confirmPassword,
    state,
    city,
    street,
    houseNumber,
    postalCode,
  }) => {
    const success = handleInputsErrors({
      fullName,
      userEmail,
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userEmail,
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
      }

      localStorage.setItem("eco-green-tech-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputsErrors({
  fullName,
  userEmail,
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
  
  return true;
}


