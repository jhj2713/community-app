package com.example.backend.repository;

import com.example.backend.model.Board;
import com.example.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByBoardId(int boardId, Pageable pageable);

    List<Board> findAllByUserId(long userId);

    Page<Board> findByTitleContaining(String search, Pageable pageable);

    Page<Board> findByBoardIdAndTitleContaining(int boardId, String search, Pageable pageable);

    Page<Board> findAllByCategory(int category, Pageable pageable);

    Page<Board> findByCategoryAndTitleContaining(int category, String search, Pageable pageable);

}
