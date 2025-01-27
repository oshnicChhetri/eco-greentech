import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/useLogin.js";
// import useSignup from "../../hooks/useSignup.js";

const Login = () => {

  const [inputs, setInputs] = useState({
    
    userEmail: "",
    password: "",
   
  });

  const {login, loading} = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  }







  return (
  <div className ="formContainer" >
    <form  onSubmit={handleSubmit}>

      <h1 className="formH1">Login</h1>

     

        <label htmlFor="email"> Email</label>
        <input value={inputs.userEmail} onChange={(e) =>{setInputs({...inputs, userEmail: e.target.value})}} type="text" id="email" className="formInput" />


        <label htmlFor="password" >Password</label>
        <input value={inputs.password} onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }} type="password" id="password" className="formInput" /> 


        


        
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? (
              <FaSpinner className="spinnerIcon" />
            ) : (
              "Login"
            )}
          </button>
        
        <div className="signupLinkContainer">
          <Link to="/signup" className="signupLink"><p>Don't have an account? Sign Up</p></Link>
        </div>
      

    </form>
  </div>
  )
};

export default Login;
