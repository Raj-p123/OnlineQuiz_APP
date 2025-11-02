package com.onlineQuiz.online_Quiz_App.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // Angular port
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    // ✅ Add new quiz with questions
    @PostMapping("/add")
    public Quiz addQuiz(@RequestBody Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // ✅ Get all quizzes
    @GetMapping("/all")
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // ✅ Get single quiz by ID
    @GetMapping("/{id}")
    public Quiz getQuizById(@PathVariable Long id) {
        return quizRepository.findById(id).orElse(null);
    }
}
