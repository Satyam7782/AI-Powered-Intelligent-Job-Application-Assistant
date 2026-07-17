package com.jobassistant.controller;

import com.jobassistant.dto.ProfileDTO;
import com.jobassistant.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    /** GET /api/profile — returns the authenticated user's profile */
    @GetMapping
    public ResponseEntity<ProfileDTO> getProfile() {
        return ResponseEntity.ok(profileService.getProfile());
    }

    /** POST /api/profile — create or update the authenticated user's profile */
    @PostMapping
    public ResponseEntity<ProfileDTO> saveProfile(@RequestBody ProfileDTO dto) {
        return ResponseEntity.ok(profileService.saveProfile(dto));
    }
}
