package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LearnPlanCommentDTO {
    private int id;
    private String comment;
    private String commenterName;
    private String profilePic;
}