import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './seller.css';

const Layout = () => {
  //const { isLoggedIn, logout } = useAuth();
  const { logout } = useAuth();
const navigate = useNavigate();

/*React.useEffect(() => {
  if (!isLoggedIn) {

    console.log("User not logged in");
    navigate('/auth');
  }
}, [isLoggedIn]);*/

const handleLogout = () => {
  logout();
  navigate('/auth');
};

// ... rest of your component code
const name = localStorage.getItem("username");
  return (
    <>
      <nav style={{ backgroundColor: "black", display: "flex", justifyContent: "flex-end", padding: "10px" }}>
      <p className="p">Welcome {name} !!!</p>
  <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "flex", gap: "20px",marginRight:"20px" }}>
    
    
    <li>
      <Link to="/buy" style={{ textDecoration: "none", color: "white" }}>
        Auctions
      </Link>
    </li>
    <span style={{ color: "white" }}>|</span>
    <li>
      <Link to="/sell" style={{ textDecoration: "none", color: "white" }}>
        My Auctions
      </Link>
    </li>
    <span style={{ color: "white" }}>|</span>
    <li>
      <Link to="/sold" style={{ textDecoration: "none", color: "white" }}>
        Sold Products
      </Link>
    </li>
    <span style={{ color: "white" }}>|</span>
    <li>
      <Link to="/buyed" style={{ textDecoration: "none", color: "white" }}>
       Bought Products
      </Link>
    </li>
    <span style={{ color: "white" }}>|</span>
    {/*<li>
      <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
        About Us
      </Link>
    </li>
  <span style={{ color: "white" }}>|</span>*/}
    <li>
      <Link to="/auth" onClick={handleLogout} style={{ textDecoration: "none", color: "red" }}>
        Logout
      </Link>
  </li>
  </ul>
</nav>



      <Outlet />
    </>
  )
};

export default Layout;