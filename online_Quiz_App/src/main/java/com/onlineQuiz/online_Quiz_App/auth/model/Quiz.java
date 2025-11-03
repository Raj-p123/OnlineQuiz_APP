package com.onlineQuiz.online_Quiz_App.auth.model;



import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String createdBy;
    private Integer durationSeconds; // optional
    private String category;


    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

    
    
    // getters & setters
}
