package com.example.demo.controller;

import com.example.demo.dto.LearnPlanDTO;
import com.example.demo.entity.LearnPlanEntity;
import com.example.demo.service.LearnPlanningService;
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
    LearnPlanningService learnPlanningService;

    @GetMapping("/allLearnPlans")
    public ResponseEntity<List<LearnPlanDTO>> allLearnPlans() {
        List<LearnPlanDTO> learnPlanDTOList = learnPlanningService.allLearnPlans();
        if (learnPlanDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(learnPlanDTOList);
        }
    }

    @PostMapping("/shareLearnPlan")
    public ResponseEntity<String> setPost(@RequestParam("userName") String userName,
            @RequestParam("post") MultipartFile image,
            @RequestParam("topicName") String topicName,
            @RequestParam("description") String description,
            @RequestParam("content") String content,
            @RequestParam("difficultyLevel") String difficultyLevel,
            @RequestParam("studySchedule") String studySchedule,
            @RequestParam("keyConcepts") String keyConcepts,
            @RequestParam("visualLearner") boolean visualLearner,
            @RequestParam("auditoryLearner") boolean auditoryLearner,
            @RequestParam("kinestheticLearner") boolean kinestheticLearner,
            @RequestParam("readingLearner") boolean readingLearner,
            @RequestParam("socialLearner") boolean socialLearner) {
        try {
            byte[] bytes = image.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(bytes);
    
            LearnPlanEntity learnPlanEntity = new LearnPlanEntity();
    
            learnPlanEntity.setUserName(userName);
            learnPlanEntity.setPost(blobImage);
            learnPlanEntity.setTopicName(topicName);
            learnPlanEntity.setDescription(description);
            learnPlanEntity.setContent(content);
            learnPlanEntity.setDifficultyLevel(difficultyLevel);
            learnPlanEntity.setStudySchedule(studySchedule);
            learnPlanEntity.setKeyConcepts(keyConcepts);
    
            // Update to learning styles
            learnPlanEntity.setVisualLearner(visualLearner);
            learnPlanEntity.setAuditoryLearner(auditoryLearner);
            learnPlanEntity.setKinestheticLearner(kinestheticLearner);
            learnPlanEntity.setReadingLearner(readingLearner);
            learnPlanEntity.setSocialLearner(socialLearner);
    
            learnPlanningService.saveLearnPlan(learnPlanEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @PatchMapping("descriptionUpdateLearn/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
            @PathVariable("description") String newDescription) {
        learnPlanningService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated description");
    }

    @PatchMapping("name/{id}/{name}")
    public ResponseEntity<String> updateTopicName(@PathVariable("id") int id,
            @PathVariable("name") String newName) {
        learnPlanningService.updateTopicName(id, newName);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("content/{id}/{content}")
    public ResponseEntity<String> updateContent(@PathVariable("id") int id,
            @PathVariable("content") String newContent) {
        learnPlanningService.updateContent(id, newContent);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("studySchedule/{id}/{studySchedule}")
    public ResponseEntity<String> updateStudySchedule(@PathVariable("id") int id,
            @PathVariable("studySchedule") String studySchedule) {
        learnPlanningService.updateStudySchedule(id, studySchedule);
        return ResponseEntity.ok("Successfully updated video");
    }

    @PatchMapping("keyConcepts/{id}/{keyConcepts}")
    public ResponseEntity<String> updateKeyConcepts(@PathVariable("id") int id,
            @PathVariable("keyConcepts") String keyConcepts) {
        learnPlanningService.updateKeyConcepts(id, keyConcepts);
        return ResponseEntity.ok("Successfully updated video");
    }

    @DeleteMapping("deleteLearn/{id}")
    public ResponseEntity<Void> deleteLearn(@PathVariable("id") int id) {
        learnPlanningService.deleteLearnPlan(id);
        return ResponseEntity.noContent().build();
    }
}