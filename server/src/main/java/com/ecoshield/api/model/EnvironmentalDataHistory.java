// Location: server/src/main/java/com/ecoshield/api/model/EnvironmentalDataHistory.java
package com.ecoshield.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "environmental_data_history")
public class EnvironmentalDataHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String ecoShieldGrade;

    @Column(nullable = false)
    private Integer aqi;

    @Column(nullable = false)
    private Double uvIndex;

    // --- ENSURE THIS FIELD EXISTS ---
    private Double temperature;
    // ---

    private String description;
    private String locationName;
}