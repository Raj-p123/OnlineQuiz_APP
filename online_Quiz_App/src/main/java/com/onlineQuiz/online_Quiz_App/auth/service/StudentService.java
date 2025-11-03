package com.onlineQuiz.online_Quiz_App.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.onlineQuiz.online_Quiz_App.DTO.QuestionDto;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuestionRepository;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired 
    private QuizRepository quizRepo;

    @Autowired 
    private QuestionRepository questionRepo;

    // ✅ Save Quiz along with its questions
    public Quiz saveQuiz(Quiz quiz) {
        if (quiz.getQuestions() != null) {
            for (Question q : quiz.getQuestions()) {
                q.setQuiz(quiz); // establish relationship
            }
        }
        return quizRepo.save(quiz);
    }

    // ✅ Get all quizzes
    public List<Quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    // ✅ Get questions for a specific quiz
    public List<QuestionDto> getQuestionsForQuiz(Long quizId) {
        List<Question> questions = questionRepo.findByQuizId(quizId);

        return questions.stream().map(q -> {
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
        }).collect(Collectors.toList());
    }

    // ✅ Count quizzes
    public long getQuizCount() {
        return quizRepo.count();
    }

    // ✅ Grade a quiz attempt
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

    // ✅ Helper inner DTO classes
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
