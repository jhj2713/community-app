package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void signup(User user) { userRepository.save(user); }

    @Transactional
    public User doubleCheck(String userId) {
        return userRepository.findByUserId(userId)
                .orElseGet(() -> { return new User(); });
    }

    @Transactional
    public User login(User user) {
        return userRepository.findByUserIdAndPassword(user.getUserId(), user.getPassword())
                .orElseGet(() -> { return new User(); });
    }

    @Transactional
    public void update(User user) {
        User findUser = userRepository.findById(user.getId())
                .orElseGet(() -> { return new User(); });
        findUser.setUserId(user.getUserId());
        findUser.setUsername(user.getUsername());
        findUser.setPassword(user.getPassword());
    }

}
