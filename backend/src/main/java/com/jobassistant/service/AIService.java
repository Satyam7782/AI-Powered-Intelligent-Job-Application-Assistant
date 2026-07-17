package com.jobassistant.service;

import com.jobassistant.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

/**
 * AI Service — Returns mock/placeholder data for all AI features.
 *
 * TODO: Replace individual method bodies with real AI API calls
 *       (e.g. Google Gemini, OpenAI GPT-4, or a Python ML microservice).
 *
 * Each method is independently swappable:
 *   - analyzeATS     → call Gemini/OpenAI with resume text + JD
 *   - recommendJobs  → call a semantic similarity model on user profile
 *   - tailorResume   → call GPT-4 to rewrite resume sections
 *   - generateCoverLetter → call Gemini Flash with user profile + JD
 */
@Service
public class AIService {

    public ATSResponse analyzeATS(MultipartFile resume, String jobDescription) {
        // TODO: Extract text from resume file (Apache PDFBox / Apache POI)
        // TODO: Send to AI: compare extracted text vs jobDescription
        return ATSResponse.builder()
                .score(82)
                .matchedSkills(List.of("Java", "Spring Boot", "SQL", "REST APIs", "Git", "Maven"))
                .missingSkills(List.of("Docker", "AWS", "Redis", "Kubernetes"))
                .suggestions(List.of(
                        "Mention REST API design principles explicitly in your experience section",
                        "Add a Docker project to your portfolio to demonstrate containerization skills",
                        "Quantify your internship achievements with specific metrics and numbers",
                        "Include any cloud platform experience — even free-tier projects count",
                        "Add unit testing experience (JUnit, Mockito) if applicable"
                ))
                .summary("Your resume shows strong Java backend skills. Adding cloud and containerization " +
                         "experience will significantly boost your ATS score for most backend roles.")
                .build();
    }

    public List<JobRecommendationDTO> recommendJobs() {
        // TODO: Build embedding of user profile skills → similarity search against job index
        return List.of(
                JobRecommendationDTO.builder()
                        .title("Java Backend Developer")
                        .company("TechCorp Solutions")
                        .matchPercentage(94)
                        .location("Bengaluru, India")
                        .type("Full-time")
                        .skills(List.of("Java", "Spring Boot", "MySQL", "REST API"))
                        .description("Build and maintain scalable Java microservices for our enterprise platform.")
                        .build(),
                JobRecommendationDTO.builder()
                        .title("Software Engineer")
                        .company("Innovate Systems")
                        .matchPercentage(91)
                        .location("Hyderabad, India")
                        .type("Full-time")
                        .skills(List.of("Java", "Spring", "Agile", "Git"))
                        .description("Join our growing team building cloud-native applications.")
                        .build(),
                JobRecommendationDTO.builder()
                        .title("Backend Engineer")
                        .company("DataFlow Inc")
                        .matchPercentage(88)
                        .location("Mumbai, India")
                        .type("Full-time")
                        .skills(List.of("Java", "Kafka", "PostgreSQL", "Docker"))
                        .description("Design high-throughput data processing pipelines and RESTful APIs.")
                        .build(),
                JobRecommendationDTO.builder()
                        .title("QA Engineer")
                        .company("QualityFirst Labs")
                        .matchPercentage(82)
                        .location("Pune, India")
                        .type("Full-time")
                        .skills(List.of("Selenium", "Java", "TestNG", "JUnit"))
                        .description("Ensure product quality through automated testing frameworks.")
                        .build()
        );
    }

    public ResumeTailoringResponse tailorResume(MultipartFile resume, String jobDescription) {
        // TODO: Extract text from resume → send both to GPT-4 / Gemini → return improved version
        String original = """
                JOHN DOE
                Software Developer | johndoe@email.com | +91-9876543210

                EDUCATION
                B.Tech in Computer Science — JNTU Hyderabad (2020-2024) | CGPA: 8.2

                SKILLS
                Java, Spring Boot, MySQL, HTML, CSS, JavaScript, Git

                EXPERIENCE
                Intern — Tech Solutions Pvt Ltd (June 2023 – Aug 2023)
                - Worked on backend development tasks
                - Fixed bugs in existing modules
                - Assisted senior developers

                PROJECTS
                Library Management System — Java + MySQL desktop application
                Student Portal — Spring Boot web app with CRUD operations

                CERTIFICATIONS
                Java Programming — Coursera""";

        String tailored = """
                JOHN DOE
                Java Backend Developer | johndoe@email.com | +91-9876543210 | LinkedIn | GitHub

                PROFESSIONAL SUMMARY
                Results-driven Java Backend Developer with hands-on experience in Spring Boot microservices,
                REST API development, and MySQL database design. Passionate about building scalable systems.

                TECHNICAL SKILLS
                Languages:   Java 17, SQL, JavaScript
                Frameworks:  Spring Boot 3, Spring Security, Spring Data JPA, Maven
                Databases:   MySQL, H2
                Tools:       Git, Postman, IntelliJ IDEA, Docker (basic)
                Concepts:    REST APIs, MVC Architecture, JWT Authentication, Agile

                PROFESSIONAL EXPERIENCE
                Backend Development Intern — Tech Solutions Pvt Ltd (June 2023 – Aug 2023)
                - Developed 5+ RESTful API endpoints using Spring Boot, reducing data fetch time by 30%
                - Resolved 15+ backend bugs, improving system stability by 20%
                - Collaborated with senior developers in an Agile sprint environment

                PROJECTS
                Library Management System (Java + MySQL + Spring Boot)
                - Built full-stack library system with JWT auth supporting 200+ concurrent users
                - Implemented CRUD operations with optimized SQL queries (avg <50ms response)

                Student Portal (Spring Boot + Thymeleaf + MySQL)
                - Developed student management portal with role-based access control
                - Integrated email notifications for assignment submission reminders

                CERTIFICATIONS
                Java Programming — Coursera (2023)
                Spring Boot Fundamentals — Udemy (2024)

                EDUCATION
                B.Tech in Computer Science — JNTU Hyderabad | CGPA: 8.2/10 | 2020–2024""";

        return ResumeTailoringResponse.builder()
                .originalResume(original)
                .tailoredResume(tailored)
                .improvements(List.of(
                        "Added quantified metrics to internship experience (+30% performance, 15+ bugs resolved)",
                        "Restructured skills section with clear categories for better ATS readability",
                        "Added professional summary tailored specifically to the target role",
                        "Enhanced project descriptions with impact metrics and technical stack details",
                        "Added LinkedIn and GitHub profile links to the header"
                ))
                .improvementScore(35)
                .build();
    }

    public CoverLetterResponse generateCoverLetter(String jobTitle, String company, String requirements) {
        // TODO: Build prompt from user profile + jobTitle + company + requirements → call AI API
        String safeCompany  = (company  != null && !company.isBlank())  ? company  : "Your Organization";
        String safeJobTitle = (jobTitle != null && !jobTitle.isBlank()) ? jobTitle : "Software Developer";
        String today = LocalDate.now().toString();

        String letter = String.format("""
                %s

                Hiring Manager
                %s

                Dear Hiring Manager,

                I am writing to express my strong interest in the %s position at %s. As a recent Computer \
                Science graduate from JNTU Hyderabad with hands-on experience in Java backend development \
                and a genuine passion for building scalable software solutions, I am confident that my \
                skills align perfectly with your team's needs.

                During my internship at Tech Solutions Pvt Ltd, I gained practical experience developing \
                RESTful APIs using Spring Boot, managing MySQL databases, and collaborating in an Agile \
                development environment. I successfully delivered 5+ API endpoints that improved data \
                processing efficiency by 30%%, and resolved 15+ backend issues that enhanced overall system \
                stability. My academic projects — including a Library Management System and a Student Portal \
                with JWT authentication — demonstrate my ability to architect and implement end-to-end \
                backend solutions independently.

                What excites me most about %s is your commitment to innovation and technical excellence. \
                I am eager to contribute to your team, continue growing as a developer, and help build \
                products that make a real impact. I bring not only strong technical skills but also a \
                collaborative mindset, enthusiasm for learning new technologies quickly, and dedication \
                to delivering high-quality work.

                I would welcome the opportunity to discuss how my background aligns with your team's goals. \
                Thank you sincerely for considering my application.

                Sincerely,
                John Doe
                johndoe@email.com | +91-9876543210 | linkedin.com/in/johndoe""",
                today, safeCompany, safeJobTitle, safeCompany, safeCompany
        );

        return CoverLetterResponse.builder()
                .coverLetter(letter)
                .jobTitle(safeJobTitle)
                .company(safeCompany)
                .wordCount(letter.split("\\s+").length)
                .build();
    }
}
