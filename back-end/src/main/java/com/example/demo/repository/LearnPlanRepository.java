package com.example.demo.repository;

import com.example.demo.entity.LearnPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnPlanRepository extends JpaRepository<LearnPlanEntity, Integer> {
}