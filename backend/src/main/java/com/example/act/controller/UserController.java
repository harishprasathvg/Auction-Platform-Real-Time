package com.example.act.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.act.model.User;

import com.example.act.service.UserService;

import jakarta.servlet.http.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @Autowired
        private HttpSession httpSession;
    
    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser( @RequestBody User user ) {
        // Validate the registration request
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Invalid registration request");
        }


        // Check if the username is already taken
        if (userService.isUsernameTaken(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }	
        // Create a new user
        User newUser = new User();	
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setRole(user.getRole());

        // Save the user to the database
        userService.registerUser(newUser);
        return ResponseEntity.ok(String.valueOf(newUser.getId()));
        }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
    	System.out.printf(username);
        Optional<User> userOptional = userService.findByUsernameAndPassword(username, password);
        if (userOptional == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        User user = userOptional.get();
        httpSession.setAttribute("currentUser", user); 
        return ResponseEntity.ok(String.valueOf(user.getId()));
    }

    @PostMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(@RequestParam String username) {
        User currentUser = userService.getUserByUsername(username);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(currentUser);
    }
}