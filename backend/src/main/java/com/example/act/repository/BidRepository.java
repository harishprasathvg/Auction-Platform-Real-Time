package com.example.act.repository;

import com.example.act.model.Bid;
import com.example.act.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {

    List<Bid> findByAuction(Auction auction);

}
