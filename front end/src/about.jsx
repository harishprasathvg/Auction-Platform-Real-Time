// AboutUs.js

import React from 'react';
import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <h2 className="about-header">About Our Auction Platform</h2>
      <div className="about-content">
        <p>Welcome to our auction platform! We provide a convenient and efficient way for users to buy and sell a wide range of items through online auctions. Whether you're a buyer looking for unique treasures or a seller seeking to reach a global audience, our platform offers the tools and resources you need.</p>
        
        <h3>Key Features:</h3>
        <ul>
          <li>Wide Variety of Items: Our platform hosts auctions for a diverse range of items, including art, antiques, collectibles, electronics, vehicles, and more.</li>
          <li>User-friendly Interface: Our intuitive interface makes it easy for users to browse, bid on, and manage auctions effortlessly.</li>
          <li>Secure Transactions: We prioritize the security of our users' transactions, providing a safe environment for buying and selling.</li>
          <li>Real-time Bidding: Experience the thrill of real-time bidding with our dynamic auction system, ensuring fair and transparent transactions.</li>
          <li>Customizable Profiles: Users can create personalized profiles to showcase their listings, track bidding activity, and manage account preferences.</li>
          <li>Mobile Accessibility: Access our platform anytime, anywhere, with mobile-responsive design for seamless browsing on smartphones and tablets.</li>
        </ul>
        
        <h3>Our Mission:</h3>
        <p>At our auction platform, our mission is to connect buyers and sellers from around the world, fostering a vibrant marketplace where unique items find new homes and valuable connections are made. We are committed to providing an exceptional user experience, promoting trust and transparency, and empowering individuals to discover, buy, and sell with confidence.</p>
      </div>
    </div>
  );
};

export default AboutUs;
