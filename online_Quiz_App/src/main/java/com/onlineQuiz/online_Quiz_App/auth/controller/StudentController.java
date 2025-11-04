package com.onlineQuiz.online_Quiz_App.auth.controller;

import org.springframework.web.bind.annotation.*;

import com.onlineQuiz.online_Quiz_App.DTO.GradingResult;
import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService.AnswerPayload;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all quizzes
    @GetMapping("/quizzes")
    public List<Quiz> getQuizzes() {
        return studentService.getAllQuizzes();
    }

    // Get total number of quizzes
    @GetMapping("/quizzes/count")
    public long getQuizCount() {
        return studentService.getQuizCount();
    }

    // Get questions for a quiz by id
    @GetMapping("/quiz/{id}/questions")
    public List<QuestionDto> getQuestions(@PathVariable("id") Long id) {
        return studentService.getQuestionsForQuiz(id);
    }

    // Submit answers by quiz id
    @PostMapping("/quiz/{id}/submit")
    public ResponseEntity<?> submitAnswers(@PathVariable("id") Long id, @RequestBody List<AnswerPayload> answers) {
        GradingResult result = studentService.gradeQuiz(id, answers);
        return ResponseEntity.ok(result);
    }

    // === NEW: Fetch questions by CATEGORY ===
    @GetMapping("/quiz/category/{category}/questions")
    public List<QuestionDto> getQuestionsByCategory(@PathVariable String category) {
        return studentService.getQuestionsForCategory(category);
    }

    // === NEW: Submit answers by CATEGORY ===
    @PostMapping("/quiz/category/{category}/submit")
    public ResponseEntity<?> submitAnswersByCategory(
        @PathVariable("category") String category,
        @RequestBody List<AnswerPayload> answers) {
        GradingResult result = studentService.gradeQuizByCategory(category, answers);
        return ResponseEntity.ok(result);
    }
}
