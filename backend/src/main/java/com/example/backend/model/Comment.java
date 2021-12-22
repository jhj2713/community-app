package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "comment")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(nullable = false, name = "boardId")
    private Board board;

    @ManyToOne
    @JoinColumn(nullable = false, name = "userId")
    private User user;

    public Comment(String content) {
        this.content = content;
    }

}
