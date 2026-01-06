// Path: api/src/main/java/com/ecoshield/api/repository/UserRepository.java
package com.ecoshield.api.repository;

import com.ecoshield.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // <-- THIS IS THE FIX
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    // --- NEW METHOD ---
    List<User> findByNotificationTime(String notificationTime);
    // --- END OF NEW METHOD ---
}