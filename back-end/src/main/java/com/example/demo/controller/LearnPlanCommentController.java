package com.example.demo.controller;

import com.example.demo.dto.LearnPlanCommentDTO;
import com.example.demo.entity.LearnPlanCommentEntity;
import com.example.demo.service.LearnPlanCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/mealPlanComments") // Keep original endpoint
public class LearnPlanCommentController {
    @Autowired
    private LearnPlanCommentService learnPlanCommentService;

    @GetMapping("/numberOfComments/{mealPlanId}") // Keep original
    public ResponseEntity<Integer> numberOfComments(@PathVariable("mealPlanId") int mealPlanId) {
        int numberOfComments = learnPlanCommentService.numberOfComments(mealPlanId);
        return numberOfComments >= 0 ? ResponseEntity.ok(numberOfComments) : ResponseEntity.notFound().build();
    }

    @GetMapping("/allComments/{mealPlanId}") // Keep original
    public ResponseEntity<List<LearnPlanCommentDTO>> getComments(@PathVariable("mealPlanId") int mealPlanId) {
        List<LearnPlanCommentDTO> commentDTOList = learnPlanCommentService.getComments(mealPlanId);
        return commentDTOList.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(commentDTOList);
    }

    @PostMapping("/saveComment")
    public ResponseEntity<String> saveComment(@RequestParam("mealPlanId") int mealPlanId,
                                            @RequestParam("commenterName") String commenterName,
                                            @RequestParam("comment") String comment) {
        try {
            LearnPlanCommentEntity commentEntity = new LearnPlanCommentEntity();
            commentEntity.setMealPlanId(mealPlanId); // Keep original field name
            commentEntity.setCommenterName(commenterName);
            commentEntity.setComment(comment);
            learnPlanCommentService.saveComment(commentEntity);
            return ResponseEntity.ok("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed comment");
        }
    }
}