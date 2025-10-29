package com.onlineQuiz.online_Quiz_App.DTO;

import java.util.List;

public class QuestionDto {
    private Long id;
    private Long quizId;
    private String question;
    private List<String> options;

    // getters/setters
    public Long getId() { return id;}
    public void setId(Long id) { this.id = id;}
    public Long getQuizId() { return quizId;}
    public void setQuizId(Long quizId) { this.quizId = quizId;}
    public String getQuestion() { return question;}
    public void setQuestion(String question) { this.question = question;}
    public List<String> getOptions() { return options;}
    public void setOptions(List<String> options) { this.options = options;}
}
