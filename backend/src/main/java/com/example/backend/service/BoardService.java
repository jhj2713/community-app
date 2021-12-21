package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
