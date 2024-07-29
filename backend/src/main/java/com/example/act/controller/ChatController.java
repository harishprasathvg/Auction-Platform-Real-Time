package com.example.act.controller;

import com.example.act.model.ChatMessage;
import com.example.act.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatMessageService chatMessageService;

    @Autowired
    public ChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage chatMessage) {
        return chatMessageService.sendMessage(chatMessage);
    }

    @GetMapping("/messages/{username}")
    public List<ChatMessage> getMessagesByUsername(@PathVariable String username) {
        return chatMessageService.getMessagesByUsername(username);
    }
}
