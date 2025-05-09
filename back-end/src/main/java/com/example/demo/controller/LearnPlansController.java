package com.example.demo.controller;

import com.example.demo.dto.LearnPlanDTO;
import com.example.demo.entity.LearnPlanEntity;
import com.example.demo.service.LearnPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping()
public class LearnPlansController {

    @Autowired
    LearnPlanService learnPlanService;

    @GetMapping("/allMealPlanes")
    public ResponseEntity<List<LearnPlanDTO>> allMealPlans() {
        List<LearnPlanDTO> mealPlanDTOList = learnPlanService.allLearnPlans();
        return mealPlanDTOList.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(mealPlanDTOList);
    }

    @PostMapping("/shareMealPlan")
    public ResponseEntity<String> setPost(@RequestParam("userName") String userName,
                                        @RequestParam("post") MultipartFile image,
                                        @RequestParam("mealName") String mealName,
                                        @RequestParam("description") String description,
                                        @RequestParam("recipe") String recipe,
                                        @RequestParam("portion") String portion,
                                        @RequestParam("mealSchedule") String mealSchedule,
                                        @RequestParam("nutrition") String nutrition,
                                        @RequestParam("vegetarian") boolean vegetarian,
                                        @RequestParam("vegan") boolean vegan,
                                        @RequestParam("glutenFree") boolean glutenFree,
                                        @RequestParam("dairyFree") boolean dairyFree,
                                        @RequestParam("nutFree") boolean nutFree) {
        try {
            byte[] bytes = image.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(bytes);

            LearnPlanEntity entity = new LearnPlanEntity();
            entity.setUserName(userName);
            entity.setPost(blobImage);
            entity.setMealName(mealName);
            entity.setDescription(description);
            entity.setRecipe(recipe);
            entity.setPortion(portion);
            entity.setSchedule(mealSchedule);
            entity.setNutrition(nutrition);
            entity.setVegetarian(vegetarian);
            entity.setVegan(vegan);
            entity.setGlutenFree(glutenFree);
            entity.setDairyFree(dairyFree);
            entity.setNutFree(nutFree);

            learnPlanService.saveLearnPlan(entity);
            return ResponseEntity.ok("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @PatchMapping("/updateMealPlan/{id}")
    public ResponseEntity<String> updateMealPlan(
            @PathVariable("id") int id,
            @RequestBody LearnPlanEntity updatedPlan) {
        try {
            learnPlanService.updateLearnPlan(id, updatedPlan);
            return ResponseEntity.ok("Study Plan updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update Study Plan: " + e.getMessage());
        }
    }

    @DeleteMapping("deleteMeal/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable("id") int id) {
        learnPlanService.deleteLearnPlan(id);
        return ResponseEntity.noContent().build();
    }

    // You can keep the individual update endpoints if needed for other parts of your application
    @PatchMapping("descriptionUpdateMeal/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                  @PathVariable("description") String newDescription) {
        learnPlanService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated description");
    }

    @PatchMapping("name/{id}/{name}")
    public ResponseEntity<String> updateMealName(@PathVariable("id") int id,
                                               @PathVariable("name") String newName) {
        learnPlanService.updatePlanName(id, newName);
        return ResponseEntity.ok("Successfully updated video");
    }

    // ... other individual update endpoints ...
}