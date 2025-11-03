package com.onlineQuiz.online_Quiz_App.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.service.QuizService;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/add")
    public ResponseEntity<String> addQuiz(@RequestBody Quiz quiz) {
        quizService.saveQuiz(quiz);
        return ResponseEntity.ok("✅ Quiz added successfully!");
    }
}
