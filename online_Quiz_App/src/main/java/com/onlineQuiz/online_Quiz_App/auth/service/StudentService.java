package com.onlineQuiz.online_Quiz_App.auth.service;

import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuestionRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private QuestionRepository questionRepo;

    // ✅ Get all quizzes
    public List<Quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    // ✅ Get total number of quizzes
    public long getQuizCount() {
        return quizRepo.count();
    }

    // ✅ Get questions for a quiz by ID (convert to DTO)
    public List<QuestionDto> getQuestionsForQuiz(Long quizId) {
        List<Question> questions = questionRepo.findByQuizId(quizId);
        return questions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ✅ Get questions by category (convert to DTO)
    public List<QuestionDto> getQuestionsForCategory(String category) {
        List<Question> questions = questionRepo.findByQuizCategory(category);
        return questions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
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

    // ✅ Grade a quiz by ID
    public GradingResult gradeQuiz(Long quizId, List<AnswerPayload> answers) {
        List<Question> questions = questionRepo.findByQuizId(quizId);

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

        GradingResult result = new GradingResult();
        result.setScore(score);
        result.setTotal(total);
        return result;
    }

    // ✅ Grade a quiz by category
    public GradingResult gradeQuizByCategory(String category, List<AnswerPayload> answers) {
        List<Question> questions = questionRepo.findByQuizCategory(category);

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

        GradingResult result = new GradingResult();
        result.setScore(score);
        result.setTotal(total);
        return result;
    }

    // ✅ Inner DTOs
    public static class AnswerPayload {
        private Long questionId;
        private String selected;

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getSelected() { return selected; }
        public void setSelected(String selected) { this.selected = selected; }
    }

    public static class GradingResult {
        private int score;
        private int total;

        public int getScore() { return score; }
        public void setScore(int score) { this.score = score; }

        public int getTotal() { return total; }
        public void setTotal(int total) { this.total = total; }
    }
}
