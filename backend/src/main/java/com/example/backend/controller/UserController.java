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

    @GetMapping("/api/user/doublecheck/{userId}")
    public ResponseDto doubleCheck(@PathVariable String userId) {
        User findUser = userService.doubleCheck(userId);
        if (findUser.getUserId() == null) {
            return new ResponseDto(HttpStatus.OK.value(), 0);
        } else {
            return new ResponseDto(HttpStatus.OK.value(), findUser);
        }
    }

    @PostMapping("/api/user/login")
    public ResponseDto login(@RequestBody User user) {
        User findUser = userService.login(user);
        if (findUser.getUserId() == null) {
            return new ResponseDto(HttpStatus.OK.value(), 0);
        } else {
            return new ResponseDto(HttpStatus.OK.value(), findUser);
        }
    }

    @PostMapping("/api/user/update")
    public ResponseDto update(@RequestBody User user) {
        userService.update(user);
        return new ResponseDto(HttpStatus.OK.value(), 1);
    }

}
