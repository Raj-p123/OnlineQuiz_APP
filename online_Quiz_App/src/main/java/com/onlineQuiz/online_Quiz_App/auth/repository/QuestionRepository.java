package com.onlineQuiz.online_Quiz_App.auth.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizId(Long quizId);
}
