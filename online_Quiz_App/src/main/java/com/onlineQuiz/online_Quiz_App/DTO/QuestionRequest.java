package com.onlineQuiz.online_Quiz_App.DTO;


import java.util.List;

public class QuestionRequest {
    private String text;
    private List<String> options; // expected 4 items
    private String correctAnswer;

    // getters & setters
    public String getText(){ return text; }
    public void setText(String t){ this.text = t; }

    public List<String> getOptions(){ return options; }
    public void setOptions(List<String> o){ this.options = o; }

    public String getCorrectAnswer(){ return correctAnswer; }
    public void setCorrectAnswer(String c){ this.correctAnswer = c; }
}
