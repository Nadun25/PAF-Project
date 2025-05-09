package com.example.demo.repository;

import com.example.demo.entity.LearnPlanCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearnPlanCommentRepository extends JpaRepository<LearnPlanCommentEntity, Integer> {
    @Query("SELECT u FROM LearnPlanCommentEntity u WHERE u.mealPlanId = :mealPlanId") // Keep original field name
    List<LearnPlanCommentEntity> findCommentByMealPlanId(int mealPlanId);
}