package com.onlineQuiz.online_Quiz_App.auth.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlineQuiz.online_Quiz_App.DTO.QuestionRequest;
import com.onlineQuiz.online_Quiz_App.DTO.QuizRequest;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;

import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class QuizService {
    @Autowired private QuizRepository quizRepo;

    @Transactional
    public Quiz createQuizFromRequest(QuizRequest req) {
        Quiz quiz = new Quiz();
        quiz.setTitle(req.getTitle());
        quiz.setDescription(req.getDescription());

        List<Question> questions = new ArrayList<>();
        if (req.getQuestions() != null) {
            for (QuestionRequest qr : req.getQuestions()) {
                Question q = new Question();
                q.setText(qr.getText());
                List<String> opts = qr.getOptions();
                if (opts == null) opts = List.of("", "", "", "");
                // map options (guard length)
                q.setOption1(opts.size() > 0 ? opts.get(0) : "");
                q.setOption2(opts.size() > 1 ? opts.get(1) : "");
                q.setOption3(opts.size() > 2 ? opts.get(2) : "");
                q.setOption4(opts.size() > 3 ? opts.get(3) : "");
                q.setCorrectAnswer(qr.getCorrectAnswer());
                q.setQuiz(quiz);
                questions.add(q);
            }
        }
        quiz.setQuestions(questions);
        return quizRepo.save(quiz);
    }

    public List<Quiz> getAll() {
        return quizRepo.findAll();
    }
}
