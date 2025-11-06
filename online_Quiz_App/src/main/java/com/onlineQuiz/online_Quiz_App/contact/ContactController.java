package com.onlineQuiz.online_Quiz_App.contact;


	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;

	@RestController
	@RequestMapping("/api/contact")
	@CrossOrigin(origins = "http://localhost:4200") // allow Angular frontend
	public class ContactController {

	    @Autowired
	    private ContactRepository contactRepository;

	    @PostMapping
	    public ResponseEntity<String> saveMessage(@RequestBody ContactMessage contactMessage) {
	        contactRepository.save(contactMessage);
	        return ResponseEntity.ok("Message received successfully!");
	    }

	    // Optional: view all messages (for admin)
	    @GetMapping
	    public ResponseEntity<?> getAllMessages() {
	        return ResponseEntity.ok(contactRepository.findAll());
	    }
	}

