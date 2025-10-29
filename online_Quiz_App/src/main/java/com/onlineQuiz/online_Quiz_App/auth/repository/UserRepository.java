package com.onlineQuiz.online_Quiz_App.auth.repository;



import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineQuiz.online_Quiz_App.auth.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
