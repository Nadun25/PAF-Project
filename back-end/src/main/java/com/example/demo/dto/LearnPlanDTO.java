package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LearnPlanDTO {
    private int id;
    private String userName;
    private String userProfilePicture;
    private String post;
    private String mealName; // Keep original field name
    private String description;
    private String recipe; // Keep original field name
    private String nutrition;
    private String portion;
    private String schedule;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean dairyFree;
    private boolean nutFree;
    private int comments;
}