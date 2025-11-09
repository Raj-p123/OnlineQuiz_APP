package com.onlineQuiz.online_Quiz_App.auth.controller;

import com.onlineQuiz.online_Quiz_App.auth.model.QuizResult;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @GetMapping("/results")
    public List<QuizResult> getAllResults() {
        return quizResultRepository.findAll();
    }

    @GetMapping("/results/quiz/{quizId}")
    public List<QuizResult> getResultsByQuiz(@PathVariable Long quizId) {
        return quizResultRepository.findByQuizId(quizId);
    }
}
