package com.example.demo.service;

import com.example.demo.dto.VideoCommentDTO;
import com.example.demo.entity.VideoCommentEntity;
import com.example.demo.repository.VideoCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoCommentService {
    @Autowired
    private VideoCommentRepository commentRepository;

    @Autowired
    private UserService userService;

    public List<VideoCommentDTO> getComments(int videoId) {
        // get all the comments of the video by video id.
        List<VideoCommentEntity> commentEntityList = commentRepository.findCommentsByVideoId(videoId);
        int length = commentEntityList.size(); // number of comments

        // initiate a commentDTO list
        List<VideoCommentDTO> commentsList = new ArrayList<>(length);
        for (VideoCommentEntity commentEntity : commentEntityList) {
            VideoCommentDTO comment = new VideoCommentDTO();
            String commenterName = commentEntity.getCommenterName();
            comment.setCommenterName(commenterName);
            comment.setId(commentEntity.getId());
            // get profile picture of commenter.
            String profilePicture = userService.getProfilePhoto(commenterName);
            comment.setProfilePicture(profilePicture);
            comment.setComment(commentEntity.getComment());
            comment.setCreatedAt(commentEntity.getCreatedAt());
            comment.setUpdatedAt(commentEntity.getUpdatedAt());
            comment.calculateIsEdited();
            commentsList.add(comment);
        }
        return commentsList;
    }

    public int numberOfComments(int videoId) {
        List<VideoCommentEntity> commentEntityList = commentRepository.findCommentsByVideoId(videoId);
        int length = commentEntityList.size(); // number of comments
        return length;
    }

    public void saveComment(VideoCommentEntity comment) {
        commentRepository.save(comment);
    }

    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }
    
    // Added method to get a comment by its ID
    public VideoCommentEntity getCommentById(int commentId) {
        Optional<VideoCommentEntity> commentOptional = commentRepository.findById(commentId);
        return commentOptional.orElse(null);
    }

    // Added method to update a comment
    public boolean updateComment(int commentId, String updatedComment) {
        VideoCommentEntity commentEntity = getCommentById(commentId);
        if (commentEntity != null) {
            commentEntity.setComment(updatedComment);
            commentRepository.save(commentEntity);
            return true;
        }
        return false;
    }
}