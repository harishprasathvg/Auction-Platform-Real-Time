import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import "./sellbid.css";

const Sellbid = () => {
    const [bidData, setBidData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startingprice, setStartingPrice] = useState(null);
    const [bidincrement, setBidIncrement] = useState(null);
    const [name, setname] = useState(null);
    const [description, setdescription] = useState(null);
    const navigate = useNavigate();
    const id = localStorage.getItem("auctionid");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let apicurrent = `http://localhost:8080/api/bids/auction/${id}`;
                const response = await axios.get(apicurrent);
                if (response.data.length === 0) {
                    setLoading(false);
                    return; // No need to proceed further
                }
                const { startingPrice, bidIncrement, itemname, itemDescription } = response.data[0].auction;
                setStartingPrice(startingPrice);
                setBidIncrement(bidIncrement);
                setname(itemname);
                setdescription(itemDescription);
                const extractedData = response.data.map((item, index) => ({
                    serial: index + 1,
                    bidder: item.buyer.username,
                    email: item.buyer.email,
                    amount: startingPrice  + bidIncrement* (index + 1)
                }));
                setBidData(extractedData);
                setLoading(false);
            } catch (error) {
                alert('failed');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="sellbid-container">
            <h3 className="sellbid-title">Bidders of Auction #{id}</h3>
            
            {bidData.length > 0 ? (
                <div>

                <div className="product-info">
                {/* <h2 className="product-name">Product Name: {name}</h2>
                 <p className="product-description">Product Description: {description}</p>*/}
                 <p className="starting-price">Starting Price:<br/> {startingprice}</p>
                 <p className="bid-increment">Bid Increment Price:<br/> {bidincrement}</p>
                </div>
                <table className="bid-table">
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Bidder</th>
                            <th>Email</th>
                            <th>Bidded Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidData.map((bid, index) => (
                            <tr key={index}>
                                <td>{bid.serial}</td>
                                <td>{bid.bidder}</td>
                                <td>{bid.email}</td>
                                <td>{bid.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <h3 className='bidmess'>Currently, No Bidders</h3>
            )}
            <button className="btn1" onClick={() => { navigate("/sell") }}>Back</button>
        </div>
    );
};

export default Sellbid;
