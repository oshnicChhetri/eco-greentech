import { Link } from 'react-router-dom';
import { RiLogoutBoxLine } from "react-icons/ri";
import { SiPhpmyadmin } from "react-icons/si";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { UseAuthContext } from '../../context/AuthContext.jsx';
import  useLogout  from "../hooks/useLogout.js";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const UserSideBar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { name: "User Details", link: "/userDetails" },
    { name: "Change Password", link: "/changePassword" },
    { name: "Orders", link: "/orders" },
    {name: "Contact Us", link: "/contactUs"}
  ];

  const {loading, logout} = useLogout();
  const {authUser} = UseAuthContext();

  const handleSubmit = async () => {
    // e.preventDefault();
    await logout();
  }

  return (

   
    <div className={`${isCollapsed ? "userSidebar" : "userSidebarCollapsed"}`}>
        
        <div className='first2IconContainer'>
        <div className='linkDiv'>
          

            <IoIosArrowDroprightCircle

              onClick={() => setIsCollapsed(false)}
            />
         
        </div>

      {
       authUser && authUser.userRole === "admin" && (
        <Link to="/admin/products">
        
        
            <div className='adminContainer'>
              <span>Admin</span>
              <SiPhpmyadmin className="adminIcon" />
            </div>
            </Link>
        )
      }
        

        </div>
        

       
     
        
     


    
        <ul className="userSidebarUL">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
                  <li key={index} className="userSidebarItem">

                      {item.name}

                  </li>
            </Link>
           
          ))}
        </ul>

     
        {loading ? (
          <FaSpinner className="spinnerIcon" />
        ) : (
          <RiLogoutBoxLine className="logoutIcon" onClick={()=>{
            handleSubmit();
            setIsCollapsed(true);
          }} />
        )}
      
      
    </div>
  );
};

export default UserSideBar;
