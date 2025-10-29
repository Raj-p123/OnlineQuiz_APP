package com.onlineQuiz.online_Quiz_App.auth.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.onlineQuiz.online_Quiz_App.OnlineQuizAppApplication;
import com.onlineQuiz.online_Quiz_App.auth.model.User;
import com.onlineQuiz.online_Quiz_App.auth.repository.UserRepository;
import com.onlineQuiz.online_Quiz_App.auth.security.JwtTokenUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final OnlineQuizAppApplication onlineQuizAppApplication;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtUtil;

    AuthService(OnlineQuizAppApplication onlineQuizAppApplication) {
        this.onlineQuizAppApplication = onlineQuizAppApplication;
    }

    // ✅ Register new user
    public Map<String, Object> registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful");
        response.put("status", true);
        return response;
    }

    // ✅ Login existing user
    public Map<String, Object> loginUser(String email, String password) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        Map<String, Object> response = new HashMap<>();

        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            String token = jwtUtil.generateToken(userOpt.get());
            response.put("token", token);
            response.put("role", userOpt.get().getRole());
            response.put("status", true);
        } else {
            response.put("message", "Invalid credentials");
            response.put("status", false);
        }
        return response;
    }
}
