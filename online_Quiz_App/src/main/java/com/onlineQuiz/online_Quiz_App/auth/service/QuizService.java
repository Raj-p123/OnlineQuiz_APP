package com.onlineQuiz.online_Quiz_App.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.onlineQuiz.online_Quiz_App.auth.model.*;
import com.onlineQuiz.online_Quiz_App.auth.repository.*;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepo;

    public Quiz saveQuiz(Quiz quiz) {
        for (Question q : quiz.getQuestions()) {
            q.setQuiz(quiz); // 🔥 Important
        }
        return quizRepo.save(quiz);
    }
}
