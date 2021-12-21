package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.time.LocalDateTime;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Transactional
    public void save(Board board, int boardId) {
        if (boardId > 2) {
            board.setBoardId(3);
            board.setCategory(boardId - 2);
        } else {
            board.setBoardId(boardId);
        }
        board.setDate(LocalDateTime.now());
        boardRepository.save(board);
    }

    @Transactional
    public void update(Board board) {
        Board findBoard = boardRepository.findById(board.getId())
                .orElseGet(() -> { return new Board(); });
        findBoard.setTitle(board.getTitle());
        findBoard.setContent(board.getContent());
        findBoard.setDate(LocalDateTime.now());
    }

    @Transactional
    public Page<Board> mainBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Transactional
    public Page<Board> freeBoards(Pageable pageable) {
        return boardRepository.findAllByBoardId(2, pageable);
    }

    @Transactional
    public Page<Board> anoBoards(Pageable pageable) {
        return boardRepository.findAllByBoardId(1, pageable);
    }

}
