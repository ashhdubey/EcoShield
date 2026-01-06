// Path: server/src/main/java/com/ecoshield/api/service/AuthService.java

package com.ecoshield.api.service;

import com.ecoshield.api.dto.AuthResponse;
import com.ecoshield.api.dto.LoginRequest;
import com.ecoshield.api.dto.RegisterRequest;
import com.ecoshield.api.model.User;
import com.ecoshield.api.repository.UserRepository;
import com.ecoshield.api.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public User register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User with this username already exists");
        }

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        // Set gender from the request
        newUser.setGender(registerRequest.getGender());

        return userRepository.save(newUser);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        // --- THIS IS THE FIX (Reverted to use email) ---
        // This must use email, because your UserDetailsServiceImpl uses email to find the user.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // --- END OF FIX ---

        // Create a map of extra claims to include in the token.
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("username", user.getUsername()); // We can still put the real username in the claims

        // Pass the user object. The JwtService will call user.getUsername()
        // which we will fix in User.java to return the email.
        String token = jwtService.generateToken(extraClaims, user);

        return new AuthResponse(token);
    }
}