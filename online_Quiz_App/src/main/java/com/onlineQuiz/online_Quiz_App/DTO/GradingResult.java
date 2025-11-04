package com.onlineQuiz.online_Quiz_App.DTO;

public class GradingResult {
    private int score;
    private int total;
    private String quizTitle;

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }
}
