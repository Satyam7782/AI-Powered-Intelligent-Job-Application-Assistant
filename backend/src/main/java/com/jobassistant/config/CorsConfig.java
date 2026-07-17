package com.jobassistant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Single source of truth for CORS.
 * Spring Security reads this bean via .cors(cors -> cors.configurationSource(...))
 * No separate CorsFilter needed — Spring Security handles preflight automatically.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        config.setAllowedOrigins(List.of(
                // Vercel production URLs
                "https://frontend-bice-seven-38.vercel.app",
                "https://frontend-8in1shwg0-satyam7782s-projects.vercel.app",
                "https://frontend-73fklabl0-satyam7782s-projects.vercel.app",
                "https://frontend-jsgrtonp3-satyam7782s-projects.vercel.app",
                // Local dev
                "http://localhost:5173",
                "http://localhost:3000"
        ));

        config.setAllowedHeaders(List.of(
                "Origin", "Content-Type", "Accept",
                "Authorization", "X-Requested-With",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"
        ));

        config.setExposedHeaders(List.of("Authorization"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
