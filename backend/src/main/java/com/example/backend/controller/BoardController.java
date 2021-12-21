package com.example.backend.controller;

import com.example.backend.ResponseDto.ResponseDto;
import com.example.backend.model.Board;
import com.example.backend.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/api/board/update")
    public ResponseDto update(@RequestBody Board board) {
        boardService.update(board);
        return new ResponseDto(HttpStatus.OK.value(), 1);
    }

    @GetMapping("/api/board/mainboards")
    public ResponseDto mainBoards(Pageable pageable) {
        return new ResponseDto(HttpStatus.OK.value(), boardService.mainBoards(pageable));
    }

    @GetMapping("/api/board/freeboards")
    public ResponseDto freeBoards(Pageable pageable) {
        return new ResponseDto(HttpStatus.OK.value(), boardService.freeBoards(pageable));
    }

    @GetMapping("/api/board/anoboards")
    public ResponseDto anoBoards(Pageable pageable) {
        return new ResponseDto(HttpStatus.OK.value(), boardService.anoBoards(pageable));
    }

}
