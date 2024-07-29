package com.example.act;


import com.example.act.model.Auction;
import com.example.act.model.User;
import com.example.act.repository.AuctionRepository;
import com.example.act.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class}
)
public class ActApplication implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    public static void main(String[] args) {
        SpringApplication.run(ActApplication.class, args);
    }

   
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("*")
                        .allowedOrigins("http://localhost:3000");//React app
            }
        };
    }

    
    public void run(ApplicationArguments args) throws Exception {
        // Sample users
        User seller1 = new User("admin", "admin", "admin@example.com", "SuperUser");
        userRepository.saveAll(List.of(seller1));
    }
}
