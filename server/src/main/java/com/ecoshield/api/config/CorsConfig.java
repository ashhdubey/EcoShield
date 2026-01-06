package com.ecoshield.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 1. Allow credentials (cookies/auth headers)
        config.setAllowCredentials(true);
        
        // 2. Allow your Vercel frontend domain
        // TIP: In production, replace "*" with your actual Vercel URL for better security
        // e.g., config.setAllowedOrigins(List.of("https://ecoshield.vercel.app"));
        config.setAllowedOriginPatterns(List.of("*"));
        
        // 3. Allow all headers and standard methods
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}