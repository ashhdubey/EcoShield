package com.ecoshield.api.controller;

import com.ecoshield.api.dto.EcoShieldData;
import com.ecoshield.api.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @GetMapping("/world")
    public ResponseEntity<List<EcoShieldData>> getRankedWorldCities() {
        List<EcoShieldData> rankedCities = rankingService.getRankedWorldCities();
        return ResponseEntity.ok(rankedCities);
    }

    @GetMapping("/india")
    public ResponseEntity<List<EcoShieldData>> getRankedIndiaCities() {
        List<EcoShieldData> rankedCities = rankingService.getRankedIndiaCities();
        return ResponseEntity.ok(rankedCities);
    }
}