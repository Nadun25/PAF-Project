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
@RequestMapping("/learnPlanComments")
public class LearnPlanCommentController {
    @Autowired
    private LearnPlanCommentService commentsService;

    @GetMapping("/numberOfComments/{learnPlanId}")
    public ResponseEntity<Integer> numberOfComments(@PathVariable("learnPlanId") int learnPlanId) {
        int numberOfComments = commentsService.numberOfComments(learnPlanId);
        if (numberOfComments >= 0) {
            return ResponseEntity.ok(numberOfComments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/allComments/{learnPlanId}")
    public ResponseEntity<List<LearnPlanCommentDTO>> getComments(@PathVariable("learnPlanId") int learnPlanId) {
        List<LearnPlanCommentDTO> commentDTOList = commentsService.getComments(learnPlanId);
        if (commentDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(commentDTOList);
        }
    }

    @PostMapping("/saveComment")
    public ResponseEntity<String> saveComment(@RequestParam("learnPlanId") int learnPlanId,
                                              @RequestParam("commenterName") String commenterName,
                                              @RequestParam("comment") String comment) {
        try {
            LearnPlanCommentEntity commentEntity = new LearnPlanCommentEntity();
            commentEntity.setLearnPlanId(learnPlanId);
            commentEntity.setCommenterName(commenterName);
            commentEntity.setComment(comment);
            commentsService.saveComment(commentEntity);
            return ResponseEntity.ok().body("successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed comment");
        }
    }
}