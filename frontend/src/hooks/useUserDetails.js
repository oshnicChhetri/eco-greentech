import { useState, useEffect } from "react"
import toast from "react-hot-toast";

const useUserDetails = () => {
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
const [userDetails, setUserDetails] = useState({})

  useEffect(()=>{
    const fetchUserDetails = async()=>{
        setLoading(true)
        try{
            const res = await fetch("/api/auth/userDetails");
            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }
            setUserDetails(data)
        }catch(error){
            toast.error(error.message)

        }finally{
            setLoading(false)
        }
    }

    fetchUserDetails();
  },[])



  const updateAddress = async({state, postalCode, city, street, houseNumber}) =>{
   
    try{

        const success = handleInputsErrors({state, postalCode, city, street, houseNumber});
        if(!success) return;
        setAddressLoading(true);
        const res = await fetch("/api/auth/updateAddress",{
            method: "PUT",
            headers: {"Content-type" : "application/json"},
            body : JSON.stringify({
                state,
                postalCode,
                city,
                street,
                houseNumber
            })

        })

        const data = await res.json();

        if(data.error){
            throw new Error(data.error);
        }else{
            setUserDetails((prev)=>({
             ...prev,
             state,
             postalCode,
             city,
             street,
             houseNumber

            }))
            toast.success("Address Updated Succesfully");
        }

    }catch(error){
        toast.error(error.message)
    }finally{
        setAddressLoading(false);
    }
  }


  const changePassword = async ({oldPassword, newPassword})=>{

    

    try{
      if (!oldPassword || !newPassword) {
        return;
      }
      setPasswordLoading(true);
      const res = await fetch("/api/auth/updatePassword",{
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          oldPassword,
          newPassword
        })
      })

      const data = await res.json();
      console.log(data)
      if(data.error){
        throw new Error(data.error);
      }

      toast.success(data.message);


    }catch(error){
      toast.error(error.message)
    }finally{
      setPasswordLoading(false)
    }
  }

  return {loading,userDetails,addressLoading, updateAddress, passwordLoading, changePassword}

}


export default useUserDetails



function handleInputsErrors({ state, postalCode, city, street, houseNumber }) {
  if (!state || !postalCode || !city || !street || !houseNumber) {
    toast.error("Please fill in all the fields");
    console.log("error");
    return false;
  }


  return true;
}