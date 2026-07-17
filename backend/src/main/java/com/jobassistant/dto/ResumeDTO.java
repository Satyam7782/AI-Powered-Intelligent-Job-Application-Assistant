package com.jobassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ResumeDTO {
    private Long id;
    private String filename;
    private Long fileSize;
    private String fileType;
    private LocalDateTime uploadedAt;
    private String message;
}
