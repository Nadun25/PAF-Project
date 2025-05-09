package com.example.demo.service;

import com.example.demo.dto.LearnPlanDTO;
import com.example.demo.entity.LearnPlanEntity;
import com.example.demo.repository.LearnPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class LearnPlanService {
    @Autowired
    private LearnPlanRepository learnPlanRepository;
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
        List<LearnPlanDTO> dtos = new ArrayList<>();
        for (LearnPlanEntity entity : learnPlanRepository.findAll()) {
            LearnPlanDTO dto = new LearnPlanDTO();
            dto.setId(entity.getId());
            dto.setUserName(entity.getUserName());
            dto.setMealName(entity.getMealName()); // Keep original field name
            dto.setPost(encodeToString(entity.getPost()));
            dto.setDescription(entity.getDescription());
            dto.setRecipe(entity.getRecipe()); // Keep original field name
            dto.setNutrition(entity.getNutrition());
            dto.setPortion(entity.getPortion());
            dto.setSchedule(entity.getSchedule());
            dto.setVegetarian(entity.isVegetarian());
            dto.setVegan(entity.isVegan());
            dto.setGlutenFree(entity.isGlutenFree());
            dto.setDairyFree(entity.isDairyFree());
            dto.setNutFree(entity.isNutFree());
            dto.setUserProfilePicture(userService.getProfilePhoto(entity.getUserName()));
            dto.setComments(learnPlanCommentService.numberOfComments(entity.getId()));
            dtos.add(dto);
        }
        return dtos;
    }

    public void saveLearnPlan(LearnPlanEntity entity) {
        learnPlanRepository.save(entity);
    }

    public void deleteLearnPlan(int id) {
        learnPlanRepository.deleteById(id);
    }

public void updateLearnPlan(int id, LearnPlanEntity updatedPlan) {
    LearnPlanEntity existingPlan = learnPlanRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Study Plan not found"));
    
    // Update all fields
    existingPlan.setMealName(updatedPlan.getMealName());
    existingPlan.setDescription(updatedPlan.getDescription());
    existingPlan.setRecipe(updatedPlan.getRecipe());
    existingPlan.setPortion(updatedPlan.getPortion());
    existingPlan.setSchedule(updatedPlan.getSchedule());
    existingPlan.setNutrition(updatedPlan.getNutrition());
    existingPlan.setVegetarian(updatedPlan.isVegetarian());
    existingPlan.setVegan(updatedPlan.isVegan());
    existingPlan.setGlutenFree(updatedPlan.isGlutenFree());
    existingPlan.setDairyFree(updatedPlan.isDairyFree());
    existingPlan.setNutFree(updatedPlan.isNutFree());
    
    learnPlanRepository.save(existingPlan);
}
}