package com.example.demo.service;

import com.example.demo.dto.LearnPlanCommentDTO;
import com.example.demo.entity.LearnPlanCommentEntity;
import com.example.demo.repository.LearnPlanCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LearnPlanCommentService {

    @Autowired
    private LearnPlanCommentRepository learnPlanCommentRepository;

    @Autowired
    private UserService userService;

    public int numberOfComments(int learnPlanId) {
        List<LearnPlanCommentEntity> commentEntityList = learnPlanCommentRepository.findCommentByLearnPlanId(learnPlanId);
        return commentEntityList.size();
    }

    public void saveComment(LearnPlanCommentEntity learnPlanComment) {
        learnPlanCommentRepository.save(learnPlanComment);
    }

    public List<LearnPlanCommentDTO> getComments(int learnPlanId) {
        List<LearnPlanCommentEntity> commentEntityList = learnPlanCommentRepository.findCommentByLearnPlanId(learnPlanId);
        List<LearnPlanCommentDTO> commentsList = new ArrayList<>(commentEntityList.size());
        
        for (LearnPlanCommentEntity commentEntity : commentEntityList) {
            LearnPlanCommentDTO comment = new LearnPlanCommentDTO();
            comment.setId(commentEntity.getId());
            String commenterName = commentEntity.getCommenterName();
            comment.setCommenterName(commenterName);

            String profilePicture = userService.getProfilePhoto(commenterName);
            comment.setProfilePic(profilePicture);
            comment.setComment(commentEntity.getComment());
            commentsList.add(comment);
        }
        return commentsList;
    }

    public void deleteComment(int commentId) {
        learnPlanCommentRepository.deleteById(commentId);
    }
}