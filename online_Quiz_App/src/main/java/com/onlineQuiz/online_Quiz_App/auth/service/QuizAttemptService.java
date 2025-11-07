package com.onlineQuiz.online_Quiz_App.auth.service;

import org.springframework.stereotype.Service;

import com.onlineQuiz.online_Quiz_App.auth.model.QuizAttempt;
import com.onlineQuiz.online_Quiz_App.auth.repository.QuizAttemptRepository;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class QuizAttemptService {

    private final QuizAttemptRepository repository;

    @Autowired
    public QuizAttemptService(QuizAttemptRepository repository) {
        this.repository = repository;
    }

    public List<QuizAttempt> getQuizAttemptsForUser(Long userId) {
        return repository.findByUserIdOrderByAttemptedAtDesc(userId);
    }

    public QuizAttempt saveAttempt(QuizAttempt attempt) {
        return repository.save(attempt);
    }
}
