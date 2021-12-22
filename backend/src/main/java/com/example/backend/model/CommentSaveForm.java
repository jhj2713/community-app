package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CommentSaveForm {

    public Comment comment;
    public Board board;
    public User user;

}
