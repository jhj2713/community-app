package com.example.backend.controller;

import com.example.backend.ResponseDto.ResponseDto;
import com.example.backend.model.Board;
import com.example.backend.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/api/board/save/{boardId}")
    public ResponseDto save(@RequestBody Board board, @PathVariable int boardId) {
        boardService.save(board, boardId);
        return new ResponseDto(HttpStatus.OK.value(), 1);
    }

}
