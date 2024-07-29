import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Buyer from "./Buyer";
import Seller from "./Seller";
import Sold from "./Sold";
import AboutUs from "./about";
import Sellbid from "./Sellbid";
import { AuthProvider } from './AuthContext';
import { New } from './New';
import AuthManager from './AuthManager';
import Soldbid from "./Soldbid";
import Buyed from "./Buyed";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    document.title = 'Auction Platform';
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
           
            <Route index element={<AuthManager />} />
            <Route path="/auth" element={<AuthManager />} />
            <Route path="/" element={<Layout />}>
            <Route path="/buy" element={<Buyer />} />
            <Route path="/sell" element={<Seller />} />
            <Route path="/buyed" element={<Buyed />} />
            <Route path="/sold" element={<Sold />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/sell/bidders" element={<Sellbid />} />
            <Route path="/sold/bidders" element={<Soldbid />} />
            
            <Route path="/sell/new" element={<New />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


              