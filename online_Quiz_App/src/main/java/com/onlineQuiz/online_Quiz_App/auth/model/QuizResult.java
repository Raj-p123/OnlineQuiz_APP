package com.onlineQuiz.online_Quiz_App.auth.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String studentEmail;
    private String quizTitle;
    private int score;
    private int totalQuestions;
    private LocalDateTime submittedAt;

    public QuizResult() {}

    public QuizResult(String studentName, String studentEmail, String quizTitle, int score, int totalQuestions) {
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.quizTitle = quizTitle;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.submittedAt = LocalDateTime.now();
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
