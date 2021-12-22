package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "board")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, name = "title")
    private String title;

    @Lob
    @Column(nullable = false, name = "content")
    private String content;

    @Column(nullable = false, name = "boardId")
    private int boardId;

    @Column(name = "category")
    private int category;

    @Column(name = "date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Board(String title, String content) {
        this.title = title;
        this.content = content;
    }

}
