package com.example.demo.repository;

import com.example.demo.entity.VideoCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoCommentRepository extends JpaRepository<VideoCommentEntity, Integer> {

    @Query("SELECT u FROM VideoCommentEntity u WHERE u.videoId = :videoId ORDER BY u.createdAt DESC")
    List<VideoCommentEntity> findCommentsByVideoId(@Param("videoId") int videoId);
    
    // This method is not strictly necessary as JpaRepository already provides findById,
    // but included for clarity and potential future customization
    @Query("SELECT c FROM VideoCommentEntity c WHERE c.id = :commentId")
    VideoCommentEntity findCommentById(@Param("commentId") int commentId);
}