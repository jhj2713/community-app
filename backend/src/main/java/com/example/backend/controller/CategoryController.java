package com.example.backend.controller;

import com.example.backend.ResponseDto.ResponseDto;
import com.example.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/api/categories")
    public ResponseDto loadCategory() {
        return new ResponseDto(HttpStatus.OK.value(), categoryService.loadCategory());
    }

}
