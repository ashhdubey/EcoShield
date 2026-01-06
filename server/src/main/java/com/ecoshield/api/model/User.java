// Location: server/src/main/java/com/ecoshield/api/model/User.java
package com.ecoshield.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference; // Ensure this is imported
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // YOUR EXISTING FIELDS
    private Integer age;
    private String skinType;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    // YOUR NOTIFICATION FIELDS
    private String phoneNumber;
    private String notificationTime;

    // NEW HEALTH FIELDS
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean hasAsthma = false;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean hasAllergies = false;

    // --- RELATIONSHIP ---
    // One User has Many History entries. This side IS serialized.
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference // Correct: Tells Jackson this is the "forward" part
    private List<EnvironmentalDataHistory> history;
    // --- END RELATIONSHIP ---

    // --- UserDetails Methods ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.email; // Use email as the principal for Spring Security
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}