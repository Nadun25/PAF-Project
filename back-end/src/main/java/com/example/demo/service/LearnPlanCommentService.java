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

    public int numberOfComments(int mealPlanId) { // Keep original parameter name
        return learnPlanCommentRepository.findCommentByMealPlanId(mealPlanId).size();
    }

    public void saveComment(LearnPlanCommentEntity commentEntity) {
        learnPlanCommentRepository.save(commentEntity);
    }

    public List<LearnPlanCommentDTO> getComments(int mealPlanId) { // Keep original parameter name
        List<LearnPlanCommentEntity> comments = learnPlanCommentRepository.findCommentByMealPlanId(mealPlanId);
        List<LearnPlanCommentDTO> dtos = new ArrayList<>();
        
        for (LearnPlanCommentEntity entity : comments) {
            LearnPlanCommentDTO dto = new LearnPlanCommentDTO();
            dto.setId(entity.getId());
            dto.setCommenterName(entity.getCommenterName());
            dto.setProfilePic(userService.getProfilePhoto(entity.getCommenterName()));
            dto.setComment(entity.getComment());
            dtos.add(dto);
        }
        return dtos;
    }

    public void deleteComment(int commentId) {
        learnPlanCommentRepository.deleteById(commentId);
    }
}