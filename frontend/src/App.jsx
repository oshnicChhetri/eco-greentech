// import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx"
// import AboutUs from "./components/AboutUs.jsx"
import AboutUs from "./pages/AboutUs.jsx";
import Home from "./pages/Home.jsx";
import CategoryProduct from "./pages/CategoryProduct.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import UserSideBar from "./components/UserSideBar.jsx";
import AdminHome from "./pages/adminPages/AdminHome.jsx"
import AdminAddAccount from "./pages/adminPages/AdminAddAccount.jsx";
import AdminAddProduct from "./pages/adminPages/AdminAddProduct.jsx";
import AdminProducts from "./pages/adminPages/AdminProducts.jsx";
import AdminOrders from "./pages/adminPages/AdminOrders.jsx";
import { Toaster } from "react-hot-toast";
import { UseAuthContext } from '../context/AuthContext.jsx';
import { useState } from "react";
import FullProductPage from "./pages/FullProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import FilteredProduct from "./pages/FilteredProduct.jsx";
import PurchaseSucess from "./pages/PurchaseSucess.jsx";
import UserOrder from "./pages/UserOrder.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ContactUs from "./pages/ContactUs.jsx";




function App() {
  const { authUser } = UseAuthContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <>
      <Toaster />

      {isAdminRoute ? (
        <AdminNavbar />
      ) : (
        <>

          <UserSideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />


          <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </>
      )}



      <Routes>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/product/:id" element={<FullProductPage/>}/>
        <Route path="/cart" element={!authUser ? <Navigate to="/" />: <Cart/>}  />
        <Route path="/purchase-sucess/" element={!authUser ? <Navigate to="/" /> : <PurchaseSucess/>}  />
        <Route path="/contactUs" element={!authUser ? <Navigate to="/" /> : <ContactUs />} />
        <Route path="/purchase-cancel"  />
        <Route path="/filteredProduct/:query" element={<FilteredProduct/>}/> 
        <Route path="/orders" element={!authUser ? <Navigate to ="/"/> : <UserOrder/>}/>
        <Route  path = "/userDetails" element={!authUser ? <Navigate to ="/"/> : <UserDetails/>}/>
        <Route path = "/changePassword" element={!authUser ? <Navigate to="/" /> : <ChangePassword/>}/>
        
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        {/* <Route path="/userPage" element={!authUser ? <Navigate to="/login" /> : <UserPage isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} /> */}

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            authUser && authUser.userRole === "admin" ? (
              <AdminHome />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            authUser && authUser.userRole === "admin" ? (
              <AdminProducts />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            authUser && authUser.userRole === "admin" ? (
              <AdminOrders />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/addProduct"
          element={
            authUser && authUser.userRole === "admin" ? (
              <AdminAddProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/addAccount"
          element={
            authUser && authUser.userRole === "admin" ? (
              <AdminAddAccount />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    
    </>
  );
}





export default App
