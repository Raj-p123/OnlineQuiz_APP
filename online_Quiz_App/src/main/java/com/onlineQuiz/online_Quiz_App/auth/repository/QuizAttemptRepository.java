package com.onlineQuiz.online_Quiz_App.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineQuiz.online_Quiz_App.auth.model.QuizAttempt;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    // Find attempts for a specific user, most recent first
    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);
}
