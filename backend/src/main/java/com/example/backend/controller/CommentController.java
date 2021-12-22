package com.example.backend.controller;

import com.example.backend.ResponseDto.ResponseDto;
import com.example.backend.model.CommentSaveForm;
import com.example.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/api/comment/save")
    public ResponseDto save(@RequestBody  CommentSaveForm commentSaveForm) {
        commentService.save(commentSaveForm.comment, commentSaveForm.board, commentSaveForm.user);
        return new ResponseDto(HttpStatus.OK.value(), 1);
    }

    @GetMapping("/api/comment/load/{boardId}")
    public ResponseDto load(@PathVariable long boardId) {
        return new ResponseDto(HttpStatus.OK.value(), commentService.load(boardId));
    }
}
