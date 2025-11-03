package com.onlineQuiz.online_Quiz_App.auth.model;


import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @Column(length = 2000)
    private String text;

    private String option1;
    private String option2;
    private String option3;
    private String option4;

    private String correctAnswer;

    // getters & setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public Quiz getQuiz(){ return quiz; }
    public void setQuiz(Quiz q){ this.quiz = q; }

    public String getText(){ return text; }
    public void setText(String t){ this.text = t; }

    public String getOption1(){ return option1; }
    public void setOption1(String o){ this.option1 = o; }

    public String getOption2(){ return option2; }
    public void setOption2(String o){ this.option2 = o; }

    public String getOption3(){ return option3; }
    public void setOption3(String o){ this.option3 = o; }

    public String getOption4(){ return option4; }
    public void setOption4(String o){ this.option4 = o; }

    public String getCorrectAnswer(){ return correctAnswer; }
    public void setCorrectAnswer(String c){ this.correctAnswer = c; }
}
