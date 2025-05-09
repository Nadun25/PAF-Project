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
@RequestMapping() // Keep original
public class LearnPlansController {

    @Autowired
    LearnPlanService learnPlanService;

    @GetMapping("/allMealPlanes") // Keep original
    public ResponseEntity<List<LearnPlanDTO>> allMealPlans() {
        List<LearnPlanDTO> mealPlanDTOList = learnPlanService.allLearnPlans();
        return mealPlanDTOList.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(mealPlanDTOList);
    }

    @PostMapping("/shareMealPlan") // Keep original
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
            entity.setMealName(mealName); // Keep original field name
            entity.setDescription(description);
            entity.setRecipe(recipe); // Keep original field name
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

    // Keep all other endpoints exactly as they were
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

    @PatchMapping("recipe/{id}/{recipe}")
    public ResponseEntity<String> updateRecipe(@PathVariable("id") int id,
                                             @PathVariable("recipe") String newRecipe) {
        learnPlanService.updateContent(id, newRecipe);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("schedule/{id}/{schedule}")
    public ResponseEntity<String> updateSchedule(@PathVariable("id") int id,
                                               @PathVariable("schedule") String schedule) {
        learnPlanService.updateSchedule(id, schedule);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("nutrition/{id}/{nutrition}")
    public ResponseEntity<String> updateNutrition(@PathVariable("id") int id,
                                                @PathVariable("nutrition") String nutrition) {
        learnPlanService.updateNutrition(id, nutrition);
        return ResponseEntity.ok("Successfully updated video");
    }

    @DeleteMapping("deleteMeal/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable("id") int id) {
        learnPlanService.deleteLearnPlan(id);
        return ResponseEntity.noContent().build();
    }
}