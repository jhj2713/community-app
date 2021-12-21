package com.example.backend.controller;

import com.example.backend.ResponseDto.ResponseDto;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/user/signup")
    public ResponseDto signup(@RequestBody User user) {
        userService.signup(user);
        return new ResponseDto(HttpStatus.OK.value(), 1);
    }

}
