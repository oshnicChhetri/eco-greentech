import { useState } from "react";
import { toast } from "react-hot-toast";
import { UseAuthContext } from "../../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = UseAuthContext();

  const login = async ({ userEmail, password }) => {
    const success = handleInputsErrors({ userEmail, password });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          
          userEmail,
          password
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("eco-green-tech-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInputsErrors({ userEmail, password }) {
  if (!userEmail || !password) {
    toast.error("Please fill in all the fields");
    console.log("error");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must have at least  6 characters");
    return false;
  }

  return true;
}
