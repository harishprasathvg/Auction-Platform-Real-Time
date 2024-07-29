package com.example.act.service;

import com.example.act.model.Bid;
import com.example.act.model.Auction;
import com.example.act.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {

    private final BidRepository bidRepository;

    @Autowired
    public BidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    public List<Bid> getBidsByAuction(Auction auction) {
        return bidRepository.findByAuction(auction);
    }

    // Add more bid-related methods as needed
}
