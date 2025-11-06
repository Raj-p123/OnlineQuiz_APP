package com.onlineQuiz.online_Quiz_App.contact;


	import org.springframework.data.jpa.repository.JpaRepository;

	public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
	}



