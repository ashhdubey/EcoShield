// Path: api/src/main/java/com/ecoshield/api/ApiApplication.java
package com.ecoshield.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling; // <-- IMPORT THIS

@EnableScheduling // <-- ADD THIS ANNOTATION
@SpringBootApplication
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

}