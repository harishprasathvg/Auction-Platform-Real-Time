import React, { useState, useEffect,useCallback } from 'react';
import { initializeApp} from 'firebase/app';
import { getDownloadURL,getStorage ,ref} from 'firebase/storage';
import './buyer.css';
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
  const [status, setStatus] = useState("Active");
  const [classid, setClassid] = useState("box");
  const [isHovered, setIsHovered] = useState(false);
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(false);

 const [amount, setAmount] = useState(auction.currentHighestBid !== 0 ? auction.currentHighestBid : auction.startingPrice);
 const [bidbuttonclass, setbidbuttonclass] = useState(auction.highbidder === username ? 'disabled' : 'bid');
 const [email,setEmail] = useState(auction.highbidder === null ? "No Bidders Yet" : auction.highbidder);

  const countdownFinish =  useCallback(async() => {
    setStatus("Closed");
    setClassid("sample1");
    onFinish();
    try {
      const data = localStorage.getItem("userdetails");
      let apicurrent = `http://localhost:8080/api/auctions/${auction.id}/close`;
      const response = await axios.get(apicurrent);
      
    } catch (error) {
      //alert('Close Failed!!');
    }
  }, [onFinish]);

  const onBid =async () => {
    setLoading(true);
    try {
      const data = localStorage.getItem("userdetails");
      const userdata = localStorage.getItem("username");
      let apicurrent = `http://localhost:8080/api/auctions/${auction.id}/bid`;
      const response = await axios.post(apicurrent, null, {
        params: {
          buyerId: data,
          bidAmount:auction.bidIncrement
        }
      });
      alert("Bidded Succesfully!!!");
      setAmount(amount+auction.bidIncrement);
      setbidbuttonclass("disabled");
      setEmail(userdata);
    } catch (error) {
      alert('Bid failed');
      //setError('Invalid username or password. Please try again.'); // Set an error message
    }
    finally{
      setLoading(true);
    }
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
  }, [auction.imageId, auction.auctionEndTime, onFinish,countdownFinish]);

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
        value={new Date(auction.auctionEndTime).getTime()}
        format="HH:mm:ss"
        onFinish={countdownFinish}
      />
      {imageUrl && <img className="image" src={imageUrl} alt="Auction" />}
      <p className="name">Name: {auction.itemname}</p>
      <p className="seller">Seller: {auction.seller.username}</p>
      <p className="mail">Email: {auction.seller.email}</p>
      
      {/*<p>Starting Price: {auction.startingPrice}</p>*/}
      <p className="curamount">Current Amount:<br /> 
          {amount}
        </p>

      <p  className="bidamount"> BidIncrement:  <br /> {auction.bidIncrement}rs</p>
            <button
        className={bidbuttonclass}
        onClick={onBid}
      >
      Bid
      </button>
      <p className="highest">
        Current Highest Bidder : 
        {email}
      </p>

      <p className="description">Product Description :{auction.itemDescription}</p>
    </div>
  );
};
const Buyer = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
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
    if (auctions.filter((auction) => auction.seller.username !== username).length !== 0) {
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
          {flag && <h2 className='heading'>Active Auctions</h2> }
        <div className="main">
          
          {auctions.filter((auction) => auction.seller.username !== username).length === 0 ? (
            <p className="mess1">Currently, no Active Auctions</p>
          ) : (
            auctions
              .filter((auction) => auction.seller.username !== username)
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

export default Buyer;
