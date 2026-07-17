package com.jobassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class CoverLetterResponse {
    private String coverLetter;
    private String jobTitle;
    private String company;
    private int wordCount;
}
