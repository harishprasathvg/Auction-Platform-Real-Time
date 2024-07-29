package com.example.act.service;

import com.example.act.model.User;
import com.example.act.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public boolean isUsernameTaken(String username) {
        User existingUser = userRepository.findByUsername(username);
        return existingUser != null;
    }
    
    public Optional<User> findByUsernameAndPassword(String username, String password) {
		Optional<User> existingUser = userRepository.findByUsernameAndPassword(username, password);
    	return existingUser;
    	
    }
}
