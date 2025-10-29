package com.onlineQuiz.online_Quiz_App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.onlineQuiz.online_Quiz_App")
public class OnlineQuizAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(OnlineQuizAppApplication.class, args);
        System.out.println("✅ Online Quiz App Backend Running on port 8080");
    }
}
