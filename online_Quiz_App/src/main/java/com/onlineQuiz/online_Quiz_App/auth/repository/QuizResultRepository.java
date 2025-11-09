package com.onlineQuiz.online_Quiz_App.auth.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.onlineQuiz.online_Quiz_App.auth.model.QuizResult;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findByStudentEmail(String email);

    List<QuizResult> findByQuizTitle(String quizTitle);
    
    List<QuizResult> findByQuizId(Long quizId);
}
