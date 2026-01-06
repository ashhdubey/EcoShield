package com.ecoshield.api.controller;

import com.ecoshield.api.dto.AuthResponse;
import com.ecoshield.api.dto.LoginRequest;
import com.ecoshield.api.dto.RegisterRequest;
import com.ecoshield.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Register the user. We don't need the returned object here.
            authService.register(registerRequest);
            // On success, return a simple confirmation message.
            return ResponseEntity.ok("User registered successfully!");
        } catch (IllegalArgumentException e) {
            // This handles cases like "user already exists".
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse authResponse = authService.login(loginRequest);
            // If login is successful, return the JWT token.
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // If credentials are bad, return a 401 Unauthorized status.
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // This is a new handler to catch validation errors and return clean messages.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(errors);
    }
}