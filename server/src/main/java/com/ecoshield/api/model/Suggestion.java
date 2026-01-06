// Location: server/src/main/java/com/ecoshield/api/model/Suggestion.java
package com.ecoshield.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "suggestions")
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // NEW: Category for the suggestion
    @Column(nullable = false)
    private String suggestionType; // e.g., "UV_TIP", "AQI_TIP", "HEALTH_TIP", "GENERAL_TIP", "PRODUCT"

    @Column(nullable = false, length = 512)
    private String text;

    @Column(nullable = false, unique = true)
    private String uniqueCode; // Replaces old "unique_text"

    // --- Conditional Fields ---

    // Nullable integer fields for ranges
    private Integer minUv;
    private Integer maxUv;

    private Integer minAqi;
    private Integer maxAqi;

    // Can still be tied to a grade
    // *** FIX: Added 'nullable = false' to match the database constraint ***
    @Column(nullable = false)
    private String applicableGrade; // A, B, C, D, E

    // NEW: Personalization fields
    private String applicableSkinType; // NORMAL, OILY, DRY, SENSITIVE, etc.
    private String applicableCondition; // ASTHMA, ALLERGIES

    // NEW: Fields for products
    private Boolean locationSpecific = false;
    private String productCategory; // SUNSCREEN, MOISTURIZER, etc.
    private String sourceUrl; // For credibility
}