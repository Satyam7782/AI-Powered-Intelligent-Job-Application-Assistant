package com.jobassistant.service;

import com.jobassistant.dto.ResumeDTO;
import com.jobassistant.entity.Resume;
import com.jobassistant.entity.User;
import com.jobassistant.repository.ResumeRepository;
import com.jobassistant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    public ResumeDTO uploadResume(MultipartFile file) throws IOException {
        User user = getCurrentUser();

        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "resume";
        String extension = originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";
        String storedFilename = UUID.randomUUID() + extension;

        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path targetPath = uploadPath.resolve(storedFilename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        Resume resume = Resume.builder()
                .user(user)
                .filename(originalFilename)
                .filepath(targetPath.toString())
                .fileSize(file.getSize())
                .fileType(file.getContentType())
                .build();

        Resume saved = resumeRepository.save(resume);
        return toDTO(saved, "Resume uploaded successfully!");
    }

    public Optional<ResumeDTO> getLatestResume() {
        User user = getCurrentUser();
        return resumeRepository.findFirstByUserOrderByUploadedAtDesc(user)
                .map(r -> toDTO(r, null));
    }

    private ResumeDTO toDTO(Resume r, String message) {
        return ResumeDTO.builder()
                .id(r.getId())
                .filename(r.getFilename())
                .fileSize(r.getFileSize())
                .fileType(r.getFileType())
                .uploadedAt(r.getUploadedAt())
                .message(message)
                .build();
    }
}
