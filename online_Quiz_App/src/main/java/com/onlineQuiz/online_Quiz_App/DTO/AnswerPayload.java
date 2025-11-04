package com.onlineQuiz.online_Quiz_App.DTO;

public class AnswerPayload {
    private Long questionId;
    private String selected;

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public String getSelected() { return selected; }
    public void setSelected(String selected) { this.selected = selected; }
}
