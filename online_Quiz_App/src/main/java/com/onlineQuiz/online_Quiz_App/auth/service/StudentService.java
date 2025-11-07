package com.onlineQuiz.online_Quiz_App.auth.service;

import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.DTO.GradingResult;
import com.onlineQuiz.online_Quiz_App.DTO.SubmissionPayload;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.model.QuizResult;
import com.onlineQuiz.online_Quiz_App.auth.model.QuizAttempt;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuestionRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizResultRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizAttemptRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private QuizResultRepository quizResultRepo;

    @Autowired
    private QuizAttemptRepository quizAttemptRepo; // <--- Your QuizAttempt repo

    // ✅ 1. Get all quizzes
    public List<Quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    // ✅ 2. Get total number of quizzes
    public long getQuizCount() {
        return quizRepo.count();
    }

    // ✅ 3. Get questions for a quiz by ID
    public List<QuestionDto> getQuestionsForQuiz(Long quizId) {
        List<Question> questions = questionRepo.findByQuizId(quizId);
        return questions.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // ✅ 4. Get questions by category
    public List<QuestionDto> getQuestionsForCategory(String category) {
        String normalized = category.trim().toLowerCase();
        System.out.println("🔍 Fetching questions for category: " + normalized);

        List<Question> questions = questionRepo.findByQuizCategory(normalized);
        System.out.println("✅ Questions found: " + questions.size());

        return questions.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // ✅ Helper to convert Entity → DTO
    private QuestionDto convertToDto(Question q) {
        QuestionDto dto = new QuestionDto();
        dto.setId(q.getId());
        dto.setQuizId(q.getQuiz().getId());
        dto.setQuestion(q.getText());
        dto.setOptions(List.of(
                q.getOption1(),
                q.getOption2(),
                q.getOption3(),
                q.getOption4()
        ));
        dto.setCorrectAnswer(q.getCorrectAnswer());
        return dto;
    }

    // ✅ 5. Grade quiz by Quiz ID (no saving)
    public GradingResult gradeQuiz(Long quizId, List<AnswerPayload> answers) {
        List<Question> questions = questionRepo.findByQuizId(quizId);

        Map<Long, String> correctAnswers = questions.stream()
                .collect(Collectors.toMap(Question::getId, Question::getCorrectAnswer));

        int total = questions.size();
        int score = 0;

        for (AnswerPayload a : answers) {
            String correct = correctAnswers.get(a.getQuestionId());
            if (correct != null && correct.equalsIgnoreCase(a.getSelected())) {
                score++;
            }
        }

        GradingResult result = new GradingResult();
        result.setScore(score);
        result.setTotal(total);
        result.setQuizTitle(
                questions.isEmpty() ? "Unknown Quiz" : questions.get(0).getQuiz().getTitle()
        );
        return result;
    }

    // ✅ 6. Grade and save quiz result
    public GradingResult gradeAndSaveQuiz(Long quizId, SubmissionPayload payload) {
        Quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<Question> questions = questionRepo.findByQuizId(quizId);
        Map<Long, String> correctAnswers = questions.stream()
                .collect(Collectors.toMap(Question::getId, Question::getCorrectAnswer));

        int score = 0;
        for (SubmissionPayload.Answer ans : payload.getAnswers()) {
            String correct = correctAnswers.get(ans.getQuestionId());
            if (correct != null && correct.equalsIgnoreCase(ans.getSelected())) {
                score++;
            }
        }

        int total = questions.size();

        // ✅ Save result in DB
        QuizResult result = new QuizResult(
                payload.getStudentName(),
                payload.getStudentEmail(),
                quiz.getTitle(),
                score,
                total
        );
        quizResultRepo.save(result);

        // ✅ Return response
        GradingResult gradingResult = new GradingResult();
        gradingResult.setScore(score);
        gradingResult.setTotal(total);
        gradingResult.setQuizTitle(quiz.getTitle());
        return gradingResult;
    }

    // ✅ 7. Fetch all results (Admin view)
    public List<QuizResult> getAllResults() {
        return quizResultRepo.findAll();
    }

    // ✅ 8. Fetch results by quiz ID
    public List<QuizResult> getResultsByQuizId(Long quizId) {
        Optional<Quiz> quizOpt = quizRepo.findById(quizId);
        if (quizOpt.isEmpty()) return List.of();
        return quizResultRepo.findByQuizTitle(quizOpt.get().getTitle());
    }

    // ✅ 9. Fetch results by student email
    public List<QuizResult> getResultsByStudent(String email) {
        return quizResultRepo.findByStudentEmail(email);
    }

    // ✅ 10. Grade quiz by category (no save)
    public GradingResult gradeQuizByCategory(String category, List<AnswerPayload> answers) {
        String normalized = category.trim().toLowerCase();
        System.out.println("🧪 Grading submission for category: " + normalized);

        List<Question> questions = questionRepo.findByQuizCategory(normalized);

        Map<Long, String> correctMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, Question::getCorrectAnswer));

        int total = questions.size();
        int score = 0;

        for (AnswerPayload a : answers) {
            String correct = correctMap.get(a.getQuestionId());
            if (correct != null && correct.equalsIgnoreCase(a.getSelected())) {
                score++;
            }
        }

        // ---- SAVE QUIZ ATTEMPT for HISTORY ---
        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(1L); // TODO: Replace with actual user ID logic
        attempt.setCategory(normalized);
        attempt.setScore(score);
        attempt.setTotal(total);
        attempt.setAttemptedAt(LocalDateTime.now());
        quizAttemptRepo.save(attempt); // Save to DB

        GradingResult result = new GradingResult();
        result.setScore(score);
        result.setTotal(total);
        result.setQuizTitle(category);
        return result;
    }

    // ✅ Inner helper class (for category grading)
    public static class AnswerPayload {
        private Long questionId;
        private String selected;

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getSelected() { return selected; }
        public void setSelected(String selected) { this.selected = selected; }
    }
}
