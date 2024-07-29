 package com.example.act.service;

import com.example.act.model.Auction;
import com.example.act.model.Bid;
import com.example.act.model.User;
import com.example.act.repository.AuctionRepository;
import com.example.act.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;

    @Autowired
    public AuctionService(AuctionRepository auctionRepository, BidRepository bidRepository) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
    }

    public Auction getAuctionById(Long auctionId) {
        Optional<Auction> auctionOptional = auctionRepository.findById(auctionId);
        return auctionOptional.orElse(null);
    }

    public List<Auction> getActiveAuctions() {
        return auctionRepository.findByStatus("Active");
    }

    public List<Auction> getClosedAuctions() {
        return auctionRepository.findByStatus("Closed");
    }

    public void createAuction(Auction auction) {
        auctionRepository.save(auction);
    }

    @Transactional
    public void placeBid(Auction auction, User buyer, BigDecimal bidAmount) {
        // Check if the bid amount is greater than or equal to the current highest bid
        BigDecimal currentHighestBid = auction.getCurrentHighestBid();
        if (currentHighestBid == null) {
            throw new IllegalArgumentException("Illegal Data");
        }

        // Update the current highest bid
        if ( currentHighestBid.compareTo(BigDecimal.ZERO) == 0) {
            auction.setCurrentHighestBid(auction.getStartingPrice().add(bidAmount));
        } else {
            auction.setCurrentHighestBid(currentHighestBid.add(bidAmount));
        }
        auction.setHighbidder(buyer.getUsername());
        auctionRepository.save(auction);

        // Create a new bid
        Bid bid = new Bid(auction, buyer, bidAmount, LocalDateTime.now());
        bidRepository.save(bid);
    }
}
