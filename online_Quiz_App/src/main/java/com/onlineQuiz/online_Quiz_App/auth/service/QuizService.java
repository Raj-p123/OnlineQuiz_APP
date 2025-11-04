package com.onlineQuiz.online_Quiz_App.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepo;

    public Quiz saveQuiz(Quiz quiz) {
        // ✅ Set the parent quiz reference in each question
        if (quiz.getQuestions() != null) {
            for (Question q : quiz.getQuestions()) {
                q.setQuiz(quiz);
            }
        }
        return quizRepo.save(quiz);
    }
}
