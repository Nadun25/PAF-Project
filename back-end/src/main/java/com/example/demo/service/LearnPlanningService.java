package com.example.demo.service;

import com.example.demo.dto.LearnPlanDTO;
import com.example.demo.entity.LearnPlanCommentEntity;
import com.example.demo.entity.LearnPlanEntity;
import com.example.demo.repository.LearnPlanCommentRepository;
import com.example.demo.repository.LearnPlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class LearnPlanningService {

    @Autowired
    private LearnPlanningRepository learnPlanningRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private LearnPlanCommentService learnPlanCommentService;

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public List<LearnPlanDTO> allLearnPlans() {
        List<LearnPlanEntity> learnPlanEntities = learnPlanningRepository.findAll();
        List<LearnPlanDTO> learnPlanDTOS = new ArrayList<>(learnPlanEntities.size());
    
        for (LearnPlanEntity learnPlan : learnPlanEntities) {
            LearnPlanDTO learnPlanDTO = new LearnPlanDTO();
            
            // Map basic fields
            learnPlanDTO.setId(learnPlan.getId());
            learnPlanDTO.setUserName(learnPlan.getUserName());
            learnPlanDTO.setTopicName(learnPlan.getTopicName());
            learnPlanDTO.setDescription(learnPlan.getDescription());
            learnPlanDTO.setContent(learnPlan.getContent());
            learnPlanDTO.setKeyConcepts(learnPlan.getKeyConcepts());
            learnPlanDTO.setDifficultyLevel(learnPlan.getDifficultyLevel());
            learnPlanDTO.setStudySchedule(learnPlan.getStudySchedule());
            
            // Map learning styles
            learnPlanDTO.setVisualLearner(learnPlan.isVisualLearner());
            learnPlanDTO.setAuditoryLearner(learnPlan.isAuditoryLearner());
            learnPlanDTO.setKinestheticLearner(learnPlan.isKinestheticLearner());
            learnPlanDTO.setReadingLearner(learnPlan.isReadingLearner());
            learnPlanDTO.setSocialLearner(learnPlan.isSocialLearner());
            
            // Map additional fields
            String userProfilePicture = userService.getProfilePhoto(learnPlan.getUserName());
            learnPlanDTO.setUserProfilePicture(userProfilePicture);
            
            int comments = learnPlanCommentService.numberOfComments(learnPlan.getId());
            learnPlanDTO.setComments(comments);
            
            String image = encodeToString(learnPlan.getPost());
            learnPlanDTO.setPost(image);
    
            learnPlanDTOS.add(learnPlanDTO);
        }
        return learnPlanDTOS;
    }

    public void saveLearnPlan(LearnPlanEntity learnPlanEntity) {
        learnPlanningRepository.save(learnPlanEntity);
    }

    public void deleteLearnPlan(int id) {
        learnPlanningRepository.deleteById(id);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<LearnPlanEntity> optionalLearnPlan = learnPlanningRepository.findById(id);
        if (optionalLearnPlan.isPresent()) {
            LearnPlanEntity learnPlan = optionalLearnPlan.get();
            learnPlan.setDescription(newDescription);
            learnPlanningRepository.save(learnPlan);
        }
    }
    
    public void updateContent(int id, String newContent) {
        Optional<LearnPlanEntity> optionalLearnPlan = learnPlanningRepository.findById(id);
        if (optionalLearnPlan.isPresent()) {
            LearnPlanEntity learnPlan = optionalLearnPlan.get();
            learnPlan.setContent(newContent);
            learnPlanningRepository.save(learnPlan);
        }
    }
    
    public void updateTopicName(int id, String newName) {
        Optional<LearnPlanEntity> optionalLearnPlan = learnPlanningRepository.findById(id);
        if (optionalLearnPlan.isPresent()) {
            LearnPlanEntity learnPlan = optionalLearnPlan.get();
            learnPlan.setTopicName(newName);
            learnPlanningRepository.save(learnPlan);
        }
    }

    public void updateKeyConcepts(int id, String newKeyConcepts) {
        Optional<LearnPlanEntity> optionalLearnPlan = learnPlanningRepository.findById(id);
        if (optionalLearnPlan.isPresent()) {
            LearnPlanEntity learnPlan = optionalLearnPlan.get();
            learnPlan.setKeyConcepts(newKeyConcepts);
            learnPlanningRepository.save(learnPlan);
        }
    }
    
    public void updateStudySchedule(int id, String newStudySchedule) {
        Optional<LearnPlanEntity> optionalLearnPlan = learnPlanningRepository.findById(id);
        if (optionalLearnPlan.isPresent()) {
            LearnPlanEntity learnPlan = optionalLearnPlan.get();
            learnPlan.setStudySchedule(newStudySchedule);
            learnPlanningRepository.save(learnPlan);
        }
    }
}