package com.jobassistant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

/**
 * CORS configuration for the Job Assistant API.
 *
 * WHY THIS IS NEEDED:
 * Browsers enforce the Same-Origin Policy. When the React frontend
 * (https://frontend-bice-seven-38.vercel.app) calls the Spring Boot
 * backend on a different domain, the browser first sends an OPTIONS
 * "preflight" request. If the server doesn't respond with the correct
 * Access-Control-Allow-Origin header, the browser blocks the real request.
 *
 * FIX:
 * - Explicitly list every allowed frontend origin (no wildcard with credentials)
 * - Allow OPTIONS preflight method
 * - Expose Authorization header so JWT can be read by the client
 * - Register on /** so ALL endpoints (including /api/auth/**) are covered
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Must be true when sending Authorization / cookies headers
        config.setAllowCredentials(true);

        // ── Allowed Origins ────────────────────────────────────────────
        // Add every frontend URL here. Never use "*" with allowCredentials=true.
        config.setAllowedOrigins(List.of(
                // Production — Vercel deployments
                "https://frontend-bice-seven-38.vercel.app",
                "https://frontend-8in1shwg0-satyam7782s-projects.vercel.app",
                "https://frontend-jsgrtonp3-satyam7782s-projects.vercel.app",

                // Local development
                "http://localhost:5173",
                "http://localhost:3000",
                "http://localhost:5174"
        ));

        // Allow all standard headers + Authorization
        config.setAllowedHeaders(List.of(
                "Origin",
                "Content-Type",
                "Accept",
                "Authorization",
                "X-Requested-With",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        // All HTTP methods including OPTIONS for preflight
        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"
        ));

        // Expose Authorization so React can read the JWT from response headers
        config.setExposedHeaders(List.of("Authorization", "Content-Disposition"));

        // Cache preflight response for 1 hour to reduce OPTIONS calls
        config.setMaxAge(3600L);

        // Apply to ALL routes — not just /api/**
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

    /**
     * Exposed as a separate bean so SecurityConfig can wire it into
     * the Spring Security CORS handler directly.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of(
                "https://frontend-bice-seven-38.vercel.app",
                "https://frontend-8in1shwg0-satyam7782s-projects.vercel.app",
                "https://frontend-jsgrtonp3-satyam7782s-projects.vercel.app",
                "http://localhost:5173",
                "http://localhost:3000",
                "http://localhost:5174"
        ));
        config.setAllowedHeaders(List.of(
                "Origin", "Content-Type", "Accept", "Authorization",
                "X-Requested-With", "Access-Control-Request-Method", "Access-Control-Request-Headers"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"));
        config.setExposedHeaders(List.of("Authorization", "Content-Disposition"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
