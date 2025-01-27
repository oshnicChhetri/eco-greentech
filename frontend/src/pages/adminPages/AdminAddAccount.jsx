import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import useAddAccount from "../../hooks/useAddAccount.js";

const AdminAddAccount = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        userEmail: "",
        userRole: "",
        password: "",
        confirmPassword: "",
        state: "",
        city: "",
        street: "",
        houseNumber: "",
        postalCode: "",
    });

    const { loading, addAccount } = useAddAccount();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addAccount(inputs);
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1 className="formH1">Add Account</h1>

                <label htmlFor="fullname">Full Name</label>
                <input
                    value={inputs.fullName}
                    onChange={(e) =>
                        setInputs({ ...inputs, fullName: e.target.value })
                    }
                    type="text"
                    id="fullname"
                    className="formInput"
                />

                <label htmlFor="email">Email</label>
                <input
                    value={inputs.userEmail}
                    onChange={(e) =>
                        setInputs({ ...inputs, userEmail: e.target.value })
                    }
                    type="text"
                    id="email"
                    className="formInput"
                />

                <label htmlFor="userRole">User Role</label>
                <select
                    value={inputs.userRole}
                    onChange={(e) =>
                        setInputs({ ...inputs, userRole: e.target.value })
                    }
                    id="userRole"
                    className="formInput"
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <label htmlFor="password">Password</label>
                <input
                    value={inputs.password}
                    onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                    }
                    type="text"
                    id="password"
                    className="formInput"
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    value={inputs.confirmPassword}
                    onChange={(e) =>
                        setInputs({ ...inputs, confirmPassword: e.target.value })
                    }
                    type="text"
                    id="confirmPassword"
                    className="formInput"
                />

                <label htmlFor="state">State</label>
                <input
                    value={inputs.state}
                    onChange={(e) =>
                        setInputs({ ...inputs, state: e.target.value })
                    }
                    type="text"
                    id="state"
                    className="formInput"
                />

                <label htmlFor="city">City</label>
                <input
                    value={inputs.city}
                    onChange={(e) =>
                        setInputs({ ...inputs, city: e.target.value })
                    }
                    type="text"
                    id="city"
                    className="formInput"
                />

                <label htmlFor="street">Street</label>
                <input
                    value={inputs.street}
                    onChange={(e) =>
                        setInputs({ ...inputs, street: e.target.value })
                    }
                    type="text"
                    id="street"
                    className="formInput"
                />

                <label htmlFor="houseNumber">House Number</label>
                <input
                    value={inputs.houseNumber}
                    onChange={(e) =>
                        setInputs({ ...inputs, houseNumber: e.target.value })
                    }
                    type="number"
                    id="houseNumber"
                    className="formInput"
                />

                <label htmlFor="postalCode">Postal Code</label>
                <input
                    value={inputs.postalCode}
                    onChange={(e) =>
                        setInputs({ ...inputs, postalCode: e.target.value })
                    }
                    type="text"
                    id="postalCode"
                    className="formInput"
                />

                <button type="submit" className="submitButton">
                    {loading ? <FaSpinner className="spinnerIcon" /> : "Add Account"}
                </button>
            </form>
        </div>
    );
};

export default AdminAddAccount;
