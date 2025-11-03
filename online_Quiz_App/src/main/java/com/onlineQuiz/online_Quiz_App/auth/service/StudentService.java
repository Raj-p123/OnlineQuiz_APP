package com.onlineQuiz.online_Quiz_App.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuestionRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired private QuizRepository quizRepo;
    @Autowired private QuestionRepository questionRepo;
    @Autowired private ObjectMapper objectMapper;

    // Fetch all quizzes
    public List<Quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    // Fetch questions by quiz ID
    public List<QuestionDto> getQuestionsForQuiz(Long quizId) {
        List<Question> qs = questionRepo.findByQuizId(quizId);
        return qs.stream().map(q -> {
            QuestionDto dto = new QuestionDto();
            dto.setId(q.getId());
            dto.setQuizId(q.getQuizId());
            dto.setQuestion(q.getQuestionText());
            try {
                List<String> opts = objectMapper.readValue(q.getOptionsJson(), List.class);
                dto.setOptions(opts);
            } catch (Exception ex) {
                dto.setOptions(List.of());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    // Fetch question count
    public long getQuizCount() {
        return quizRepo.count();
    }

    // NEW: Fetch questions by category
    public List<QuestionDto> getQuestionsForCategory(String category) {
        List<Question> qs = questionRepo.findByQuizCategory(category);
        return qs.stream().map(q -> {
            QuestionDto dto = new QuestionDto();
            dto.setId(q.getId());
            dto.setQuizId(q.getQuizId());
            dto.setQuestion(q.getQuestionText());
            try {
                List<String> opts = objectMapper.readValue(q.getOptionsJson(), List.class);
                dto.setOptions(opts);
            } catch (Exception ex) {
                dto.setOptions(List.of());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    // Grade quiz responses by quiz ID
    public GradingResult gradeQuiz(Long quizId, List<AnswerPayload> answers) {
        List<Question> qs = questionRepo.findByQuizId(quizId);
        java.util.Map<Long, String> correctMap = qs.stream().collect(
            Collectors.toMap(Question::getId, Question::getCorrectOption));
        int total = qs.size();
        int score = 0;
        for (AnswerPayload a : answers) {
            String correct = correctMap.get(a.getQuestionId());
            if (correct != null && correct.equals(a.getSelected())) score++;
        }
        GradingResult result = new GradingResult();
        result.setScore(score);
        result.setTotal(total);
        return result;
    }

    // NEW: Grade quiz by category
    public GradingResult gradeQuizByCategory(String category, List<AnswerPayload> answers) {
        List<Question> qs = questionRepo.findByQuizCategory(category);
        java.util.Map<Long, String> correctMap = qs.stream().collect(
            Collectors.toMap(Question::getId, Question::getCorrectOption));
        int total = qs.size();
        int score = 0;
        for (AnswerPayload a : answers) {
            String correct = correctMap.get(a.getQuestionId());
            if (correct != null && correct.equals(a.getSelected())) score++;
        }
        GradingResult result = new GradingResult();
        result.setScore(score);
        result.setTotal(total);
        return result;
    }

    // DTOs
    public static class AnswerPayload {
        private Long questionId;
        private String selected;
        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long id) { this.questionId = id; }
        public String getSelected() { return selected; }
        public void setSelected(String s) { this.selected = s; }
    }

    public static class GradingResult {
        private int score;
        private int total;
        public int getScore() { return score; }
        public void setScore(int s) { this.score = s; }
        public int getTotal() { return total; }
        public void setTotal(int t) { this.total = t; }
    }
}
