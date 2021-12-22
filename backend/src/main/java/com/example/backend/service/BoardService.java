package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.model.User;
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
    public void save(Board board, User user, int boardId) {
        if (boardId > 2) {
            board.setBoardId(3);
            board.setCategory(boardId - 2);
        } else {
            board.setBoardId(boardId);
        }
        board.setDate(LocalDateTime.now());
        board.setUser(user);
        boardRepository.save(board);
    }

    @Transactional
    public Board update(Board board) {
        Board findBoard = boardRepository.findById(board.getId())
                .orElseGet(() -> { return new Board(); });
        findBoard.setTitle(board.getTitle());
        findBoard.setContent(board.getContent());
        findBoard.setDate(LocalDateTime.now());
        return findBoard;
    }

    @Transactional
    public void delete(Board board) {
        boardRepository.deleteById(board.getId());
    }

    @Transactional
    public Page<Board> mainBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Transactional
    public Page<Board> searchMainBoards(Pageable pageable, String search) {
        return boardRepository.findByTitleContaining(search, pageable);
    }

    @Transactional
    public Page<Board> freeBoards(Pageable pageable) {
        return boardRepository.findAllByBoardId(2, pageable);
    }

    @Transactional
    public Page<Board> searchFreeBoards(Pageable pageable, String search) {
        return  boardRepository.findByBoardIdAndTitleContaining(2, search, pageable);
    }

    @Transactional
    public Page<Board> anoBoards(Pageable pageable) {
        return boardRepository.findAllByBoardId(1, pageable);
    }

    @Transactional
    public Page<Board> searchAnoBoards(Pageable pageable, String search) {
        return  boardRepository.findByBoardIdAndTitleContaining(1, search, pageable);
    }

    @Transactional
    public Page<Board> groupBoards(Pageable pageable, int category) {
        return boardRepository.findAllByCategory(category, pageable);
    }

    @Transactional
    public Page<Board> searchGroupBoards(Pageable pageable, int category, String search) {
        return  boardRepository.findByCategoryAndTitleContaining(category, search, pageable);
    }

}
