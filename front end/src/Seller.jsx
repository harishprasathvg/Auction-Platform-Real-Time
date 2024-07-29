import { useNavigate } from "react-router-dom";
import React, { useState, useEffect,useCallback } from 'react';
import { initializeApp} from 'firebase/app';
import { getDownloadURL,getStorage ,ref} from 'firebase/storage';
import './buyer.css';
import { Statistic } from 'antd';
import axios from "axios";
import LoadingScreen from './LoadingScreen';

const { Countdown } = Statistic;

const firebaseConfig = {
  //api key
};
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


const Auction = ({ auction, onFinish }) => {
  const username = localStorage.getItem("username");
  const [status, setStatus] = useState("Active");
  const [classid, setClassid] = useState("box2");
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(new Date(auction.auctionEndTime).getTime());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  
  const countdownFinish = useCallback(() => {
    setStatus("Closed");
    setClassid("sample1");
    onFinish();
  }, [onFinish]);
  

  const onShow = async () => {
    
    localStorage.setItem("auctionid",auction.id);
    navigate("./bidders");
    
  }

  const onClose = async () => {
    setLoading(true);
    try {
      const data = localStorage.getItem("userdetails");
      let apicurrent = `http://localhost:8080/api/auctions/${auction.id}/close`;
      const response = await axios.get(apicurrent);
    } catch (error) {
      //console.error('closed failed');
      //setError('Invalid username or password. Please try again.'); // Set an error message
    }
    setStatus("Closed");
    setClassid("sample1");
    setValue(new Date(Date.now()));
    //console.log("Closed");
    setLoading(false);
  }
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

    if (new Date(auction.auctionEndTime).getTime() <= Date.now()) {
      countdownFinish();
    }
    return () => {
      // Cleanup or additional logic if needed
    };
  }, [auction.id, auction.auctionEndTime, onFinish, countdownFinish]);
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
        onFinish={countdownFinish}
      />
      {imageUrl && <img className="image" src={imageUrl} alt="Auction" />}
      <p className="name">Name: {auction.itemname}</p>
      <p className="seller">Seller: {auction.seller.username}</p>
      <p className="mail">Email: {auction.seller.email}</p>
      {/*<p>Starting Price: {auction.startingPrice}</p>*/}
      <p className="curamount">Current Amount:<br /> 
        {auction.currentHighestBid !== 0 ? `${auction.currentHighestBid}rs` : `${auction.startingPrice}rs`}
      </p>

      <p  className="bidamount"> BidIncrement:  <br /> {auction.bidIncrement}rs</p>
      <button className="close" onClick={onClose}>Close</button>
      <p className="highest">
        Current Highest Bidder : 
        {auction.highbidder !== null ? auction.highbidder : "No Bidders Yet"}
      </p>

      <p className="description">Product Description :{auction.itemDescription}</p>
      <button className="show" onClick={onShow}>Show Bidders</button>
    </div>
  );
};
const Seller = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/auctions/active');
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
    if (auctions.filter((auction) => auction.seller.username === username).length !== 0) {
      setFlag(true);
    }
  }, [loading, auctions, username]);
  return (
    <div>
      {loading && <LoadingScreen />}
      <button className="new" onClick={() => navigate("./new")}>Create New Auction</button>
      {loading ? (
        <p>Loading auctions...</p>
      ) : (
        <div>
         {flag && <h2 className='heading'>Your Active Auctions</h2> }
        <div className="main">
          {auctions.filter((auction) => auction.seller.username === username).length === 0 ? (
            <p className="mess0">You have no active auctions</p>
          ) : (
            auctions
              .filter((auction) => auction.seller.username === username)
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

export default Seller;
