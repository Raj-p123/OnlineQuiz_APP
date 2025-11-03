package com.onlineQuiz.online_Quiz_App.DTO;


import java.util.List;

public class QuizRequest {
    private String title;
    private String description;
    private List<QuestionRequest> questions;

    // getters & setters
    public String getTitle(){ return title; }
    public void setTitle(String t){ this.title = t; }

    public String getDescription(){ return description; }
    public void setDescription(String d){ this.description = d; }

    public List<QuestionRequest> getQuestions(){ return questions; }
    public void setQuestions(List<QuestionRequest> q){ this.questions = q; }
}
