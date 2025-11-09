package com.onlineQuiz.online_Quiz_App.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.onlineQuiz.online_Quiz_App.auth.model.QuizAttempt;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    // Find attempts for a specific user, most recent first
    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);

    long countByUserId(Long userId);

    @Query("SELECT AVG(qa.score) FROM QuizAttempt qa WHERE qa.userId = :userId")
    Double findAverageScoreByUserId(@Param("userId") Long userId);

    @Query("SELECT u, SUM(qa.score) as totalScore FROM User u JOIN QuizAttempt qa ON u.id = qa.userId GROUP BY u.id ORDER BY totalScore DESC")
    List<Object[]> findTopPerformers();
}
