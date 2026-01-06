package com.ecoshield.api.repository;

import com.ecoshield.api.model.EnvironmentalDataHistory;
import com.ecoshield.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<EnvironmentalDataHistory, Long> {

    // Finds a record for a specific user on a specific date
    Optional<EnvironmentalDataHistory> findByUserAndDate(User user, LocalDate date);

    // Finds the last 7 records for a specific user, ordered by most recent date first
    List<EnvironmentalDataHistory> findTop7ByUserOrderByDateDesc(User user);

    // --- CHANGED FROM Optional TO List TO HANDLE DUPLICATES ---
    // Finds records for a specific user on a specific date AT a specific location
    List<EnvironmentalDataHistory> findByUserAndDateAndLocationName(User user, LocalDate date, String locationName);
    // ---------------------------------------------------------

    // Finds the last 7 records for a user AFTER a specific date
    List<EnvironmentalDataHistory> findTop7ByUserAndDateAfterOrderByDateDesc(User user, LocalDate date);
}