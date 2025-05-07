package com.example.demo.entity;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "learn_plans")
public class LearnPlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userName;
    private String topicName;
    @Lob
    private Blob post;
    private String description;
    private String content;
    private String keyConcepts;
    @Column(name = "`difficultyLevel`")
    private String difficultyLevel;
    private String studySchedule;
    
    // Change from dietary preferences to learning styles
    private boolean visualLearner;
    private boolean auditoryLearner;
    private boolean kinestheticLearner;
    private boolean readingLearner;
    private boolean socialLearner;
}