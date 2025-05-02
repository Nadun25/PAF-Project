package com.example.demo.repository;

import com.example.demo.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query("SELECT u FROM CommentEntity u WHERE u.pictureId = :pictureId ORDER BY u.createdAt DESC")
    List<CommentEntity> findCommentsByPictureId(@Param("pictureId") int pictureId);
    
    // This method is not strictly necessary as JpaRepository already provides findById,
    // but included for clarity and potential future customization
    @Query("SELECT c FROM CommentEntity c WHERE c.id = :commentId")
    CommentEntity findCommentById(@Param("commentId") int commentId);
}