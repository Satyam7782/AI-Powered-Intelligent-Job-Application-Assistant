package com.jobassistant.controller;

import com.jobassistant.dto.ResumeDTO;
import com.jobassistant.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    /** POST /api/resume/upload — upload a resume file (PDF or DOCX) */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(resumeService.uploadResume(file));
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "File upload failed: " + e.getMessage()));
        }
    }

    /** GET /api/resume — get the most recently uploaded resume metadata */
    @GetMapping
    public ResponseEntity<?> getResume() {
        return resumeService.getLatestResume()
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
