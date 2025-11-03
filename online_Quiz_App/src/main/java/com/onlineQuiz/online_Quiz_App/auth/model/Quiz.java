package com.onlineQuiz.online_Quiz_App.auth.model;



import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 2000)
    private String description;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

    // getters & setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getTitle(){ return title; }
    public void setTitle(String t){ this.title = t; }

    public String getDescription(){ return description; }
    public void setDescription(String d){ this.description = d; }

    public List<Question> getQuestions(){ return questions; }
    public void setQuestions(List<Question> q){ this.questions = q; }
}
