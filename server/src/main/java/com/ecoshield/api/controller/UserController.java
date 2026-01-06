// Path: api/src/main/java/com/ecoshield/api/controller/UserController.java

package com.ecoshield.api.controller;

import com.ecoshield.api.dto.UpdateProfileRequest;
import com.ecoshield.api.model.User;
import com.ecoshield.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // This endpoint will be GET /api/users/me
    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile(Authentication authentication) {
        String userEmail = authentication.getName();

        // --- FIX: Use orElseThrow to get the User or handle not found ---
        User user = userService.getUserByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userEmail)); // Or a more appropriate exception

        return ResponseEntity.ok(user);
    }

    // This endpoint will be PUT /api/users/me
    @PutMapping("/me")
    public ResponseEntity<User> updateMyProfile(Authentication authentication, @RequestBody UpdateProfileRequest profileRequest) {
        String userEmail = authentication.getName();
        User updatedUser = userService.updateUserProfile(userEmail, profileRequest);
        return ResponseEntity.ok(updatedUser);
    }
}