package com.example.act.controller;
import com.example.act.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.act.model.Auction;
import com.example.act.model.Bid;
import com.example.act.service.AuctionService;

 
import java.util.List;

@RestController
@RequestMapping("/api/bids")
public class BidController {

    private final BidService bidService;
    private final AuctionService auctionService;
    @Autowired
    public BidController(BidService bidService,AuctionService auctionService) {
        this.bidService = bidService;
        this.auctionService = auctionService;
    }

    @GetMapping("/auction/{auctionId}")
    public ResponseEntity<List<Bid>> getBidsByAuction(@PathVariable Long auctionId) {
        Auction auction = auctionService.getAuctionById(auctionId);

        if (auction == null) {
            return ResponseEntity.notFound().build();
        }

        List<Bid> bids = bidService.getBidsByAuction(auction);
        return ResponseEntity.ok(bids);
    }

}
