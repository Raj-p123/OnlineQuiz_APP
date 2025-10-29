package com.onlineQuiz.online_Quiz_App.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineQuiz.online_Quiz_App.auth.model.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizId(Long quizId);
}
