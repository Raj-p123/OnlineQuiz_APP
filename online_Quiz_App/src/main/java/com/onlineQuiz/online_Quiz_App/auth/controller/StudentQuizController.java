package com.onlineQuiz.online_Quiz_App.auth.controller;

import org.springframework.web.bind.annotation.*;
import com.onlineQuiz.online_Quiz_App.auth.model.QuizAttempt;
import com.onlineQuiz.online_Quiz_App.auth.service.QuizAttemptService;
import org.springframework.http.ResponseEntity;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/student/quiz")
public class StudentQuizController {

    private final QuizAttemptService attemptService;

    public StudentQuizController(QuizAttemptService attemptService) {
        this.attemptService = attemptService;
    }

    // Endpoint to get quiz history for logged-in user
    @GetMapping("/history")
    public ResponseEntity<List<QuizAttempt>> getQuizHistory(HttpServletRequest request) {
        Long userId = getCurrentUserId(request); // replace with real user ID extraction logic
        List<QuizAttempt> attempts = attemptService.getQuizAttemptsForUser(userId);
        return ResponseEntity.ok(attempts);
    }

    // Save quiz attempt - call from your submit endpoint after quiz submission
    @PostMapping("/attempt")
    public ResponseEntity<QuizAttempt> saveAttempt(@RequestBody QuizAttempt attempt, HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        attempt.setUserId(userId);
        attempt.setAttemptedAt(java.time.LocalDateTime.now());
        QuizAttempt saved = attemptService.saveAttempt(attempt);
        return ResponseEntity.ok(saved);
    }

    private Long getCurrentUserId(HttpServletRequest request) {
        // TODO: Implement extraction of userId from session or JWT token based on your security implementation
        // For now, return hardcoded userId for testing:
        return 1L;
    }
}
