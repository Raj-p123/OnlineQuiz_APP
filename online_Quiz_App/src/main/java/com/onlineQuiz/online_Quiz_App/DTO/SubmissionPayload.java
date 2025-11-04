package com.onlineQuiz.online_Quiz_App.DTO;

import java.util.List;

public class SubmissionPayload {

    private String studentName;
    private String studentEmail;
    private List<Answer> answers;

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public List<Answer> getAnswers() { return answers; }
    public void setAnswers(List<Answer> answers) { this.answers = answers; }

    public static class Answer {
        private Long questionId;
        private String selected;

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getSelected() { return selected; }
        public void setSelected(String selected) { this.selected = selected; }
    }
}
