package com.onlineQuiz.online_Quiz_App.auth.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineQuiz.online_Quiz_App.auth.model.Quiz;


public interface QuizRepository extends JpaRepository<Quiz, Long> {}
