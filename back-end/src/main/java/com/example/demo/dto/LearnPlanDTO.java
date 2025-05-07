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
    private String topicName;
    private String description;
    private String content;
    private String keyConcepts;
    private String difficultyLevel;
    private String studySchedule;

    // Change from dietary preferences to learning styles
    private boolean visualLearner;
    private boolean auditoryLearner;
    private boolean kinestheticLearner;
    private boolean readingLearner;
    private boolean socialLearner;

    private int comments;
}