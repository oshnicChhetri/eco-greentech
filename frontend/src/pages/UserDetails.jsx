import { useState } from "react";
import useUserDetails from "../hooks/useUserDetails";
import { FaSpinner } from "react-icons/fa";

const UserDetails = () => {
    const { loading, userDetails, addressLoading, updateAddress } = useUserDetails();

    // State for edit mode and updated address
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState({
        state: "",
        postalCode: "",
        city:  "",
        street:  "",
        houseNumber: "",
    });
    

   
   

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        await updateAddress(address)
       
    };

    if (loading) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="userDetailsContainer">
            <div className="userDetails">
                <div className="userDetailsFullName">
                    <h1>Name:</h1>
                    <span>{userDetails?.fullName || "N/A"}</span>
                </div>

                <div className="userDetailsEmail">
                    <h1>Email:</h1>
                    <span>{userDetails?.email || "N/A"}</span>
                </div>
            </div>

            <div className="userAddress">
                {!isEditing ? (
                    <>
                        <div className="userAddressDetial">
                            <h1>State:</h1>
                            <span>{userDetails.state || "N/A"}</span>
                        </div>

                        <div className="userAddressDetial">
                            <h1>Postal Code:</h1>
                            <span>{userDetails.postalCode || "N/A"}</span>
                        </div>

                        <div className="userAddressDetial">
                            <h1>City:</h1>
                            <span>{userDetails.city || "N/A"}</span>
                        </div>

                        <div className="userAddressDetial">
                            <h1>Street:</h1>
                            <span>{userDetails.street || "N/A"}</span>
                        </div>

                        <div className="userAddressDetial">
                            <h1>House Number:</h1>
                            <span>{userDetails.houseNumber || "N/A"}</span>
                        </div>

                        <button
                            className="editAddressBtn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Address
                        </button>
                    </>
                ) : (
                    <form className="editAddressForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label>State:</label>
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={(e) =>{setAddress({...address, state: e.target.value})}}
                            />
                        </div>

                        <div className="formGroup">
                            <label>Postal Code:</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={address.postalCode}
                                    onChange={(e) => { setAddress({ ...address, postalCode: e.target.value }) }}
                            />
                        </div>

                        <div className="formGroup">
                            <label>City:</label>
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                    onChange={(e) => { setAddress({ ...address, city: e.target.value }) }}
                            />
                        </div>

                        <div className="formGroup">
                            <label>Street:</label>
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                    onChange={(e) => { setAddress({ ...address, street: e.target.value }) }}
                            />
                        </div>

                        <div className="formGroup">
                            <label>House Number:</label>
                            <input
                                type="text"
                                name="houseNumber"
                                value={address.houseNumber}
                                    onChange={(e) => { setAddress({ ...address, houseNumber: e.target.value }) }}
                            />
                        </div>

                        <button type="submit" className="saveAddressBtn">
                                {!addressLoading ? (
                                    "Save Address" // Display the text if not loading
                                ) : (
                                    <FaSpinner className="spinnerIcon" /> // Show spinner if loading
                                )}
                            
                        </button>
                        <button
                            type="button"
                            className="cancelEditBtn"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
