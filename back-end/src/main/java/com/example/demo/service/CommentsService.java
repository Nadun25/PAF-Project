package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entity.CommentEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class CommentsService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    public List<CommentDTO> getComments(int pictureId) {
        // get all the comments of the picture by picture id.
        List<CommentEntity> commentEntityList = commentRepository.findCommentsByPictureId(pictureId);
        int length = commentEntityList.size(); // number of comments

        // initiate a commentDTO list
        List<CommentDTO> commentsList = new ArrayList<>(length);
        for (CommentEntity commentEntity : commentEntityList) {
            CommentDTO comment = new CommentDTO();
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

    public int numberOfComments(int pictureId) {
        List<CommentEntity> commentEntityList = commentRepository.findCommentsByPictureId(pictureId);
        int length = commentEntityList.size(); // number of comments
        return length;
    }

    public void saveComment(CommentEntity comment) {
        commentRepository.save(comment);
    }

    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }

    // Added method to get a comment by its ID
    public CommentEntity getCommentById(int commentId) {
        Optional<CommentEntity> commentOptional = commentRepository.findById(commentId);
        return commentOptional.orElse(null);
    }

    // Added method to update a comment
    public boolean updateComment(int commentId, String updatedComment) {
        CommentEntity commentEntity = getCommentById(commentId);
        if (commentEntity != null) {
            commentEntity.setComment(updatedComment);
            commentRepository.save(commentEntity);
            return true;
        }
        return false;
    }
}
