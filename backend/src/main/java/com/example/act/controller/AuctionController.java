package com.example.act.controller;

import com.example.act.model.Auction;
import com.example.act.model.User;
import com.example.act.service.AuctionService;
import com.example.act.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/auctions")
public class AuctionController {

    private final AuctionService auctionService;
    private final UserService userService;

    @Autowired
    public AuctionController(AuctionService auctionService, UserService userService) {
        this.auctionService = auctionService;
        this.userService = userService;
    }

    @PostMapping("/create") //Working
    public ResponseEntity<String> createAuction(
            @RequestParam Long sellerId,
            @RequestParam String itemname,
            @RequestParam String itemDescription,
            @RequestParam BigDecimal startingPrice,
            @RequestParam BigDecimal bidIncrement,
            @RequestParam LocalDateTime auctionEndTime,
            @RequestParam String imageId
            ) {

        // Check if the seller exists
        User seller = userService.getUserById(sellerId);
        if (seller == null) {
            return ResponseEntity.badRequest().body("Seller not found");
        }

        Auction newAuction = new Auction();
        newAuction.setSeller(seller);
        newAuction.setItemname(itemname);
        newAuction.setItemDescription(itemDescription);
        newAuction.setStartingPrice(startingPrice);
        newAuction.setCurrentHighestBid(BigDecimal.valueOf(0));
        newAuction.setBidIncrement(bidIncrement);
        newAuction.setAuctionEndTime(auctionEndTime);
        newAuction.setImageId(imageId);
        newAuction.setStatus("Active");
  
        auctionService.createAuction(newAuction);

        return ResponseEntity.ok("Auction created successfully");
    }

    @GetMapping("/{auctionId}") //Working
    public ResponseEntity<Auction> getAuctionById(@PathVariable Long auctionId) {
        Auction auction = auctionService.getAuctionById(auctionId);
        if (auction != null) {
            return ResponseEntity.ok(auction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{auctionId}/close") //Working
    public ResponseEntity<String> CloseAuctionbyId(@PathVariable Long auctionId) {
        Auction auction = auctionService.getAuctionById(auctionId);
        auction.setStatus("Closed");
        auctionService.createAuction(auction);// To add Email API is possible
        return ResponseEntity.ok("this is closed");
    }
    

    @GetMapping("/active") //Working
    public ResponseEntity<List<Auction>> getActiveAuctions() {
        List<Auction> activeAuctions = auctionService.getActiveAuctions();
        return ResponseEntity.ok(activeAuctions);
    }

    @GetMapping("/closed") //Working
    public ResponseEntity<List<Auction>> getClosedAuctions() {
        List<Auction> activeAuctions = auctionService.getClosedAuctions();
        return ResponseEntity.ok(activeAuctions);
    }

    @PostMapping("/{auctionId}/bid")//Buyer need to be created //Working 
    public ResponseEntity<String> placeBid(
            @PathVariable Long auctionId,
            @RequestParam Long buyerId,// Bit of a confusion here need to be solved in frontend
            @RequestParam BigDecimal bidAmount) {

        // Check if the auction exists
        Auction auction = auctionService.getAuctionById(auctionId);
        if (auction == null) {
            return ResponseEntity.badRequest().body("Auction not found");
        }

        // Check if the buyer exists
        User buyer = userService.getUserById(buyerId);
        if (buyer == null) {
            return ResponseEntity.badRequest().body("Buyer not found");
        }

        // Place the bid
        auctionService.placeBid(auction, buyer, bidAmount);

        return ResponseEntity.ok("Bid placed successfully");
    }
    
    /*@PostMapping("/{auctionId}/close")//Buyer need to be created //Working 
    public ResponseEntity<String> closeAuction(
            @PathVariable Long auctionId,
            @RequestParam Long sellerId)
    {

        // Check if the auction exists
        Auction auction = auctionService.getAuctionById(auctionId);
        if (auction == null) {
            return ResponseEntity.badRequest().body("Auction not found");
        }
		return ResponseEntity.ok(auction.getHighbidder());
    }*/
}
