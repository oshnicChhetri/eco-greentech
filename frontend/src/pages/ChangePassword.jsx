import {useState} from "react";
import useUserDetails from "../hooks/useUserDetails";
import { FaSpinner } from "react-icons/fa";
const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        oldPassword : "",
        newPassword : ""
    })
   
    const {passwordLoading, changePassword} = useUserDetails();

    const handleSubmit = async(e)=>{
        e.preventDefault();
         await changePassword(passwords);
    }
  return (
        <div className="changePasswordContainer">

            <form onSubmit={handleSubmit} className="changePasswordsContainer">

                <label htmlFor="oldPassword">Previous Password:</label>
                <input type="text" id="oldPassword" placeholder="Previous Password"
                    value={passwords.oldPassword}
                    onChange={(e)=>{
                        setPasswords({...passwords, oldPassword : e.target.value})
                    }}
                />

                <label htmlFor="newPassowrd"> New Password:</label>
                <input type="password" id="newPassword" placeholder="New password" 
                value={passwords.newPassword} 
                onChange={(e)=>{setPasswords({...passwords, newPassword: e.target.value})}}
                />

                <button type="submit">
                    {!passwordLoading?(
                      "Change Password"
                    ): (
                          <FaSpinner className="spinnerIcon" />
                    )}
                    
                </button>

            </form>

        </div>
  )
}

export default ChangePassword