// Save this file in: api/src/main/java/com/ecoshield/api/dto/LoginRequest.java

package com.ecoshield.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}