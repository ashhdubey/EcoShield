// Save this file in: api/src/main/java/com/ecoshield/api/dto/AuthResponse.java

package com.ecoshield.api.dto;

import lombok.Getter;

@Getter
public class AuthResponse {
    private final String accessToken;

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}