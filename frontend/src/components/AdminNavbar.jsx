import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";
import { FaSpinner } from "react-icons/fa";


const AdminNavbar = () => {
  // const { authUser } = UseAuthContext();

  const menuItems = [
    { name: "Products", link: "admin/products" },
    { name: "Orders", link: "admin/orders" },
    { name: "Add Product", link: "admin/addProduct" },
    { name: "Add Account", link: "admin/addAccount" },
  ];
  const { loading, logout } = useLogout();

  const handleSubmit = async () => {
    // e.preventDefault();
    await logout();
  }
  return (
    <nav className="mainAdminNav">
      <Link to="/" className=" mainLogoLink">
        <img className="mainLogo" src="/logo.png" alt="mainLogo" />
      </Link>

      {menuItems.map((item, index) => (
        <Link to={item.link} key={index}>
          <div key={item.name} className="adminNavItems">
            {item.name}
          </div>
        </Link>
      ))}

      <Link to="/">
        {loading ? (
          <FaSpinner className="spinnerIcon" />
        ) : (
          <RiLogoutBoxLine className="adminLogoutIcon" onClick={handleSubmit} />
        )}
      </Link>


    </nav>
  );
};

export default AdminNavbar;
