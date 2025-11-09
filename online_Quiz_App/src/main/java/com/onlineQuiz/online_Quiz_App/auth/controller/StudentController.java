package com.onlineQuiz.online_Quiz_App.auth.controller;

import org.springframework.web.bind.annotation.*;

import com.onlineQuiz.online_Quiz_App.DTO.GradingResult;
import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.model.User; // Import User
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService.AnswerPayload;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional; // Import Optional
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus; // Import HttpStatus
import java.util.Map;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/dashboard/{studentId}")
    public ResponseEntity<Map<String, Object>> getDashboardData(@PathVariable Long studentId) {
        Map<String, Object> dashboardData = studentService.getDashboardData(studentId);
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<Map<String, Object>>> getLeaderboard() {
        List<Map<String, Object>> leaderboard = studentService.getLeaderboard();
        return ResponseEntity.ok(leaderboard);
    }

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

    // NEW: Get student profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getStudentProfile(@PathVariable Long id) {
        Optional<User> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // NEW: Update student profile
    @PutMapping("/{id}")
    public ResponseEntity<User> updateStudentProfile(@PathVariable Long id, @RequestBody User user) {
        if (!id.equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        User updatedUser = studentService.updateStudent(user);
        return ResponseEntity.ok(updatedUser);
    }
}
