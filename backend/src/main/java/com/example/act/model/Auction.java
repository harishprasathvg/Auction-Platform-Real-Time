 package com.example.act.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;
    private String itemname;
    private String itemDescription;
    private String imageId;
    private BigDecimal startingPrice;
    private BigDecimal currentHighestBid;
    private String highbidder;
    private BigDecimal bidIncrement;
    private LocalDateTime auctionEndTime;
    private String status; // Active or Closed

    // Getters and setters

   
	public Auction() {
		// TODO Auto-generated constructor stub
	}
	

    public Auction(User seller,String itemname, String itemDescription, BigDecimal startingPrice,
                   BigDecimal bidIncrement, LocalDateTime auctionEndTime, String status) {
        this.seller = seller;
        this.itemname = itemname;
        this.itemDescription = itemDescription;
        this.startingPrice = startingPrice;
        this.bidIncrement = bidIncrement;
        this.auctionEndTime = auctionEndTime;
        this.status = status;
    }

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller2) {
        this.seller = seller2;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public BigDecimal getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(BigDecimal startingPrice) {
        this.startingPrice = startingPrice;
    }

    public BigDecimal getCurrentHighestBid() {
        return currentHighestBid;
    }

    public void setCurrentHighestBid(BigDecimal currentHighestBid) {
        this.currentHighestBid = currentHighestBid;
    }

    public BigDecimal getBidIncrement() {
        return bidIncrement;
    }

    public void setBidIncrement(BigDecimal bidIncrement) {
        this.bidIncrement = bidIncrement;
    }

    public LocalDateTime getAuctionEndTime() {
        return auctionEndTime;
    }

    public void setAuctionEndTime(LocalDateTime auctionEndTime) {
        this.auctionEndTime = auctionEndTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


	public String getItemname() {
		return itemname;
	}


	public void setItemname(String itemname) {
		this.itemname = itemname;
	}


	public String getImageId() {
		return imageId;
	}


	public void setImageId(String imageId) {
		this.imageId = imageId;
	}


	public String getHighbidder() {
		return highbidder;
	}


	public void setHighbidder(String highbidder) {
		this.highbidder = highbidder;
	}
}
