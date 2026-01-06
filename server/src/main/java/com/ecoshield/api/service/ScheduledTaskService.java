// Path: api/src/main/java/com/ecoshield/api/service/ScheduledTaskService.java
package com.ecoshield.api.service;

import com.ecoshield.api.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
public class ScheduledTaskService {

    private final UserRepository userRepository;

    // SENIOR NOTE: We removed NotificationService from the constructor
    // because that file was deleted.
    public ScheduledTaskService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // This task runs every minute to check the schedule
    @Scheduled(cron = "0 * * * * ?")
    public void sendScheduledNotifications() {
        String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));

        // We can keep the log so you can see the background task is still "alive"
        // even if it's not sending messages right now.
        System.out.println("Background check at " + currentTime + " - (Notification feature currently disabled)");

        /* FEATURE REMOVED:
           Previously, this loop found users and called notificationService.
           Since we are disabling notifications for now, we have cleared this logic.
        */
    }
}