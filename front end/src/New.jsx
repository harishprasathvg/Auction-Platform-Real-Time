import React, { useState } from 'react';
import './new.css';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import {  getStorage, ref, uploadBytes } from 'firebase/storage';
import LoadingScreen from './LoadingScreen';

export const New = () => {
  const [loading, setLoading] = useState(false);
    const firebaseConfig = {
        //api key
      };
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
      
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemname:'',
    itemDescription: '',
    startingPrice: '',
    bidIncrement: '',
    auctionEndTime: '',
    imageId: '',
    imageId2: '',
    status:"active",
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    
    const uniqueImageId = `image_${Date.now()}`;
    const uniqueImageId2 = uniqueImageId+".jpg"
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageId: uniqueImageId,
      imageId2: uniqueImageId2,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const data = localStorage.getItem("userdetails");
    e.preventDefault();
    if(formData.itemname===''){
      setLoading(false);
      alert("Enter Valid Item Name");
    }
    else if(formData.itemDescription===''){
      setLoading(false);
      alert("Enter Valid Item Description");
    }
    else if(formData.startingPrice===''){
      setLoading(false);
      alert("Enter Valid Starting Price");
    }
    else if(formData.bidIncrement===''){
      setLoading(false);
      alert("Enter Valid Bid Increment Price");
    }
   else if(new Date(formData.auctionEndTime) > Date.now()){
    if (image) {
      const imageRef = ref(storage, `${formData.imageId2}`);
      await uploadBytes(imageRef, image);
      try {
        const response = await axios.post('http://localhost:8080/api/auctions/create', null, {
          params: {
            sellerId:data,
            itemname:formData.itemname,
            itemDescription: formData.itemDescription,
            startingPrice: formData.startingPrice,
            bidIncrement: formData.bidIncrement,
            auctionEndTime: formData.auctionEndTime,
            imageId: formData.imageId,
          }
        });
        //alert("New Auction Created");
      } catch (error) {
        alert('Creation failed:');
      }finally{
        setLoading(false);
      }
   
    
    navigate('/sell')
    }
    else{
      setLoading(false);
      alert("Choose an Image");
      
    }
   }
   else{
    setLoading(false);
    alert("Enter Valid End Time");
   }
    
  };

  return (
    <div className="main2">
      {loading && <LoadingScreen />}
      <div className="first2">
        <h1>Create New Auction</h1>
        <form onSubmit={handleSubmit}>
          <label>
          Item Name:
            <input
              type="text"
              name="itemname"
              value={formData.itemname}
              onChange={handleInputChange}
            />
          </label>
          <label>
          <br />
            Item Description:
            <input
              type="text"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Starting Price:
            <input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Bid Increment:
            <input
              type="number"
              name="bidIncrement"
              value={formData.bidIncrement}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Auction End Time:
            <input
              type="datetime-local"
              name="auctionEndTime"
              value={formData.auctionEndTime}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br />
          <button type="submit">Create Auction</button>
          <br />
          <button className="back" onClick={() => navigate('/sell')}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
};
