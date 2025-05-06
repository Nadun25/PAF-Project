package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private int id;
    private String commenterName;
    private String profilePicture;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isEdited;
    
    // Helper method to check if comment was edited
    public void calculateIsEdited() {
        if (createdAt != null && updatedAt != null) {
            this.isEdited = !updatedAt.equals(createdAt);
        }
    }
}