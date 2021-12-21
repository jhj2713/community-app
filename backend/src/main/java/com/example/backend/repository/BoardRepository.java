package com.example.backend.repository;

import com.example.backend.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByBoardId(int boardId, Pageable pageable);

    Page<Board> findByTitleContaining(String search, Pageable pageable);

    Page<Board> findByBoardIdAndTitleContaining(int boardId, String search, Pageable pageable);

}
