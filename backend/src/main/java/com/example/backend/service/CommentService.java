package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.model.Comment;
import com.example.backend.model.User;
import com.example.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public void save(Comment comment, Board board, User user) {
        comment.setBoard(board);
        comment.setUser(user);
        commentRepository.save(comment);
    }

    @Transactional
    public List<Comment> load(long boardId) {
        return commentRepository.findAllByBoardId(boardId);
    }

    @Transactional
    public void delete(Comment comment) {
        commentRepository.deleteById(comment.getId());
    }
}
