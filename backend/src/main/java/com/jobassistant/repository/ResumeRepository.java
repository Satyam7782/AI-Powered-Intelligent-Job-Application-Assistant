package com.jobassistant.repository;

import com.jobassistant.entity.Resume;
import com.jobassistant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserOrderByUploadedAtDesc(User user);
    Optional<Resume> findFirstByUserOrderByUploadedAtDesc(User user);
}
