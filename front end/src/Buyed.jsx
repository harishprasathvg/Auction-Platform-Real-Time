import React, { useState, useEffect,useCallback } from 'react';
import { initializeApp} from 'firebase/app';
import { getDownloadURL,getStorage ,ref} from 'firebase/storage';
import './buyer.css';
import './buyed.css';
import { Statistic } from 'antd';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
const { Countdown } = Statistic;


const firebaseConfig = {
 //api key
};
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


const Auction = ({ auction, onFinish }) => {
  const [status, setStatus] = useState("Closed");
  const [classid, setClassid] = useState("sample2");
  const [isHovered, setIsHovered] = useState(false);
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(false);

 const [amount, setAmount] = useState(auction.currentHighestBid !== 0 ? auction.currentHighestBid : auction.startingPrice);
 const [bidbuttonclass, setbidbuttonclass] = useState(auction.highbidder === username ? 'disabled' : 'bid');
 const [email,setEmail] = useState(auction.highbidder === null ? "No Bidders Yet" : auction.highbidder);
 const today = new Date();
today.setHours(0, 0, 0, 0);
 const [value, setValue] = useState(today.getTime());
  
  const [imageUrl, setImageUrl] = useState(null);
  
  useEffect(() => {
    const imageName = auction.imageId+".jpg";
    const imageRef = ref(storage, imageName);
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        //console.error('Error getting download URL:', error);
      });

   
    return () => {
      // Cleanup or additional logic if needed
    };
  }, [auction.imageId, auction.auctionEndTime, onFinish]);

  return (
    
    <div className={`auction-container ${classid} ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <p className="id">Id: {auction.id}</p>
      {status === "Active" ? (
        <>
          <p className="active">Active</p>
          <img className="icon" src={require('./icon1.jpg')} alt="Active Icon" />
        </>
      ) : (
        <>
          <p className="closed">Closed</p>
          <img className="icon" src={require('./icon2.jpg')} alt="Closed Icon" />
        </>
      )}
      <Countdown className="countdown"
        value={value}
        format="HH:mm:ss"
        
      />
      {imageUrl && <img className="image" src={imageUrl} alt="Auction" />}
      <p className="name">Name: {auction.itemname}</p>
      <p className="seller">Seller: {auction.seller.username}</p>
      <p className="mail">Email: {auction.seller.email}</p>
      
      {/*<p>Starting Price: {auction.startingPrice}</p>*/}
      <p className="curamount3">Amount:
          {amount}rs
        </p>



      <p className="description3">Product Description :{auction.itemDescription}</p>
    </div>
  );
};
const Buyed = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auctions/closed');
        setAuctions(response.data);
      } catch (error) {
        //console.error('Error fetching auction data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [flag,setFlag]= useState(false);
  useEffect(() => {
    if (auctions.filter((auction) => auction.highbidder === username).length !== 0) {
      setFlag(true);
    }
  }, [loading, auctions, username]);
  
  return (
    <div>
      {loading && <LoadingScreen />}
      {loading ? (
        <p>Loading auctions...</p>
      ) : (
        <div>
        {flag && <h2 className="heading">Bought Products</h2>}
        <div className="main">
          {auctions.filter((auction) => auction.highbidder === username).length === 0 ? (
            <p className="mess3">Currently, no Products Bought</p>
           
          ) : (
            auctions
              .filter((auction) => auction.highbidder === username)
              .map((auction) => (
                <Auction key={auction.id} auction={auction} onFinish={() => {
                  // Callback function for onFinish event
                }} />
              ))
          )}
        </div>
        </div>
      )}
    </div>
  );
};

export default Buyed;
