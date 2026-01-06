// Location: server/src/main/java/com/ecoshield/api/dto/UpdateProfileRequest.java
package com.ecoshield.api.dto;

import com.ecoshield.api.model.Gender;
import lombok.Getter;

@Getter
public class UpdateProfileRequest {
    // Fields from your ProfilePage.tsx
    private Integer age;
    private String skinType;
    private Gender gender;
    private String phoneNumber;
    private String notificationTime;

    // New health fields
    private Boolean hasAsthma;
    private Boolean hasAllergies;
}