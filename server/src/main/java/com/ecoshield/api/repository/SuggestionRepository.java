// Location: server/src/main/java/com/ecoshield/api/repository/SuggestionRepository.java
package com.ecoshield.api.repository;

import com.ecoshield.api.model.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    // --- OLD methods (can be kept or removed if unused) ---
    List<Suggestion> findByApplicableGrade(String grade);
    List<Suggestion> findByApplicableGradeAndApplicableSkinType(String grade, String skinType);

    // --- NEW Personalized Query ---
    @Query("SELECT s FROM Suggestion s WHERE " +
            // 1. Match UV range (or if UV is not applicable)
            "(:uvIndex IS NULL OR (s.minUv IS NULL AND s.maxUv IS NULL) OR (s.minUv <= :uvIndex AND s.maxUv >= :uvIndex)) " +
            "AND " +
            // 2. Match AQI range (or if AQI is not applicable)
            "(:aqi IS NULL OR (s.minAqi IS NULL AND s.maxAqi IS NULL) OR (s.minAqi <= :aqi AND s.maxAqi >= :aqi)) " +
            "AND " +
            // 3. Match Grade (or if Grade is not applicable)
            "(:grade IS NULL OR s.applicableGrade IS NULL OR s.applicableGrade = :grade) " +
            "AND " +
            // 4. Match Skin Type (or if Skin Type is not applicable)
            "(:skinType IS NULL OR s.applicableSkinType IS NULL OR s.applicableSkinType = :skinType) " +
            "AND " +
            // 5. Match Health Conditions (or if Condition is not applicable)
            "(s.applicableCondition IS NULL " +
            "OR (:hasAsthma = TRUE AND s.applicableCondition = 'ASTHMA') " +
            "OR (:hasAllergies = TRUE AND s.applicableCondition = 'ALLERGIES')) " )
    // 6. Removed "AND (s.suggestionType = 'GENERAL_TIP')" - This was incorrect logic,
    //    we want ALL matching types, not just GENERAL_TIP here.
    //    The service layer will handle selecting general tips separately if needed.
    List<Suggestion> findRelevantSuggestions(
            @Param("uvIndex") Integer uvIndex,
            @Param("aqi") Integer aqi,
            @Param("grade") String grade,
            @Param("skinType") String skinType,
            @Param("hasAsthma") Boolean hasAsthma,
            // --- FIX: Corrected typo in @Param name from hasAllergIES to hasAllergies ---
            @Param("hasAllergies") Boolean hasAllergies
    );

    // --- NEW General Query (remains the same) ---
    @Query("SELECT s FROM Suggestion s WHERE " +
            "(s.suggestionType = 'GENERAL_TIP') OR " +
            "(s.minUv <= :uvIndex AND s.maxUv >= :uvIndex) OR " +
            "(s.minAqi <= :aqi AND s.maxAqi >= :aqi) OR " +
            "(s.applicableGrade = :grade)"
    )
    List<Suggestion> findGeneralSuggestions(
            @Param("uvIndex") Integer uvIndex,
            @Param("aqi") Integer aqi,
            @Param("grade") String grade
    );
}