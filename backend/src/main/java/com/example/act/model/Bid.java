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
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    private BigDecimal bidAmount;

    private LocalDateTime bidTimestamp;

    // Constructors

    public Bid() {
        // Default constructor for JPA
    }

    public Bid(Auction auction, User buyer, BigDecimal bidAmount, LocalDateTime bidTimestamp) {
        this.auction = auction;
        this.buyer = buyer;
        this.bidAmount = bidAmount;
        this.bidTimestamp = bidTimestamp;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public BigDecimal getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(BigDecimal bidAmount) {
        this.bidAmount = bidAmount;
    }

    public LocalDateTime getBidTimestamp() {
        return bidTimestamp;
    }

    public void setBidTimestamp(LocalDateTime bidTimestamp) {
        this.bidTimestamp = bidTimestamp;
    }
}
