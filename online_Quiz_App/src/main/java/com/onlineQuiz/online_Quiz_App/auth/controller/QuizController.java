package com.onlineQuiz.online_Quiz_App.auth.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private List<Map<String, Object>> quizzes = new ArrayList<>();

    @PostMapping("/add")
    public ResponseEntity<String> addQuiz(@RequestBody Map<String, Object> quizData) {
        System.out.println("📥 Received quiz: " + quizData);
        quizzes.add(quizData);
        return ResponseEntity.ok("Quiz saved successfully!");
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAllQuizzes() {
        return quizzes;
    }
}
