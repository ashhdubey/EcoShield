// Location: server/src/main/java/com/ecoshield/api/service/UserService.java
package com.ecoshield.api.service;

import com.ecoshield.api.dto.UpdateProfileRequest;
import com.ecoshield.api.model.User;
import com.ecoshield.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // In file: server/src/main/java/com/ecoshield/api/service/UserService.java

    public User updateUserProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields from your page
        // Note: We use .get() here because your frontend logic ensures values are present
        // or null, matching the DTO.
        user.setAge(request.getAge());
        user.setSkinType(request.getSkinType());
        user.setGender(request.getGender());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setNotificationTime(request.getNotificationTime());

        // Update new health conditions
        user.setHasAsthma(request.getHasAsthma());
        user.setHasAllergies(request.getHasAllergies());

        return userRepository.save(user);
    }
}