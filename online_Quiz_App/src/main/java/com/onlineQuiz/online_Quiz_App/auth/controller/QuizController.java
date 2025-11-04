package com.onlineQuiz.online_Quiz_App.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.onlineQuiz.online_Quiz_App.DTO.GradingResult;
import com.onlineQuiz.online_Quiz_App.DTO.SubmissionPayload;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.model.QuizResult;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuestionRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;
import com.onlineQuiz.online_Quiz_App.auth.service.QuizService;
import com.onlineQuiz.online_Quiz_App.auth.service.StudentService;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {

    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private QuizService quizService;

    @Autowired
    private StudentService studentService; // ✅ use autowired instance, not static calls

    // ✅ Add a new quiz
    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addQuiz(@RequestBody Quiz quiz) {
        quizService.saveQuiz(quiz);
        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Quiz added successfully!");
        return ResponseEntity.ok(response);
    }

    // ✅ Get all quizzes
    @GetMapping("/all")
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizRepo.findAll();
        return ResponseEntity.ok(quizzes);
    }

    // ✅ Delete quiz by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id) {
        quizRepo.deleteById(id);
        return ResponseEntity.ok("🗑️ Quiz deleted successfully!");
    }

    // ✅ Update quiz by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
        return quizRepo.findById(id)
                .map(quiz -> {
                    quiz.setTitle(updatedQuiz.getTitle());
                    quiz.setDescription(updatedQuiz.getDescription());
                    quiz.setCategory(updatedQuiz.getCategory());
                    return ResponseEntity.ok(quizRepo.save(quiz));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get all questions for a specific quiz
    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuestionsByQuiz(@PathVariable Long quizId) {
        Quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        return ResponseEntity.ok(quiz.getQuestions());
    }

    // ✅ Delete a question by ID
    @DeleteMapping("/question/delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        questionRepo.deleteById(id);
        return ResponseEntity.ok("🗑️ Question deleted successfully!");
    }

    // ✅ Update a question by ID
    @PutMapping("/question/update/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updated) {
        Question q = questionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        q.setText(updated.getText());
        q.setOption1(updated.getOption1());
        q.setOption2(updated.getOption2());
        q.setOption3(updated.getOption3());
        q.setOption4(updated.getOption4());
        q.setCorrectAnswer(updated.getCorrectAnswer());

        return ResponseEntity.ok(questionRepo.save(q));
    }

    // ✅ Submit quiz and save result
    @PostMapping("/quiz/{id}/submit")
    public ResponseEntity<GradingResult> submitQuiz(
            @PathVariable("id") Long id,
            @RequestBody SubmissionPayload payload) {
        GradingResult result = studentService.gradeAndSaveQuiz(id, payload);
        return ResponseEntity.ok(result);
    }

    // ✅ Fetch all results (Admin view)
    @GetMapping("/results")
    public ResponseEntity<List<QuizResult>> getAllResults() {
        return ResponseEntity.ok(studentService.getAllResults());
    }

    // ✅ Fetch results for a specific quiz
    @GetMapping("/results/quiz/{id}")
    public ResponseEntity<List<QuizResult>> getResultsForQuiz(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getResultsByQuizId(id));
    }

    // ✅ Fetch results for a specific student (by email)
    @GetMapping("/results/student/{email}")
    public ResponseEntity<List<QuizResult>> getResultsForStudent(@PathVariable String email) {
        return ResponseEntity.ok(studentService.getResultsByStudent(email));
    }
}
