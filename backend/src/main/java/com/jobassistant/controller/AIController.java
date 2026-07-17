package com.jobassistant.controller;

import com.jobassistant.dto.*;
import com.jobassistant.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * AI Feature Controller
 *
 * All endpoints currently return mock data from AIService.
 * Replace service method bodies with real AI API calls when ready.
 *
 * Endpoints:
 *   POST /api/ai/ats-analysis      → ATS score + skill gap
 *   GET  /api/ai/recommend-jobs    → Job recommendations
 *   POST /api/ai/tailor-resume     → Side-by-side resume comparison
 *   POST /api/ai/cover-letter      → Generated cover letter
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/ats-analysis")
    public ResponseEntity<ATSResponse> analyzeATS(
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            @RequestParam("jobDescription") String jobDescription) {
        return ResponseEntity.ok(aiService.analyzeATS(resume, jobDescription));
    }

    @GetMapping("/recommend-jobs")
    public ResponseEntity<List<JobRecommendationDTO>> recommendJobs() {
        return ResponseEntity.ok(aiService.recommendJobs());
    }

    @PostMapping("/tailor-resume")
    public ResponseEntity<ResumeTailoringResponse> tailorResume(
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            @RequestParam(value = "jobDescription", required = false) String jobDescription) {
        return ResponseEntity.ok(aiService.tailorResume(resume, jobDescription));
    }

    @PostMapping("/cover-letter")
    public ResponseEntity<CoverLetterResponse> generateCoverLetter(
            @RequestBody Map<String, String> request) {
        String jobTitle     = request.getOrDefault("jobTitle", "");
        String company      = request.getOrDefault("company", "");
        String requirements = request.getOrDefault("requirements", "");
        return ResponseEntity.ok(aiService.generateCoverLetter(jobTitle, company, requirements));
    }
}
