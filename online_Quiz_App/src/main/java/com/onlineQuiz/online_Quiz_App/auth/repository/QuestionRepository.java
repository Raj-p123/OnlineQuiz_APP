package com.onlineQuiz.online_Quiz_App.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.onlineQuiz.online_Quiz_App.auth.model.Question;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizId(Long quizId);

    // NEW: Fetch questions by quiz category
    @Query("SELECT q FROM Question q JOIN Quiz quiz ON q.quizId = quiz.id WHERE quiz.category = :category")
    List<Question> findByQuizCategory(@Param("category") String category);
}
