package com.onlineQuiz.online_Quiz_App.auth.controller;


import org.springframework.web.bind.annotation.*;

import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService.AnswerPayload;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService.GradingResult;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired private StudentService studentService;

    @GetMapping("/quizzes")
    public List<Quiz> getQuizzes() {
        return studentService.getAllQuizzes();
    }

    @GetMapping("/quizzes/count")
    public long getQuizCount() {
        return studentService.getQuizCount();
    }

    @GetMapping("/quiz/{id}/questions")
    public List<QuestionDto> getQuestions(@PathVariable("id") Long id) {
        // returns question DTOs WITHOUT correct answers
        return studentService.getQuestionsForQuiz(id);
    }

    @PostMapping("/quiz/{id}/submit")
    public ResponseEntity<?> submitAnswers(@PathVariable("id") Long id, @RequestBody List<AnswerPayload> answers) {
        GradingResult result = studentService.gradeQuiz(id, answers);
        return ResponseEntity.ok(result);
    }
}
