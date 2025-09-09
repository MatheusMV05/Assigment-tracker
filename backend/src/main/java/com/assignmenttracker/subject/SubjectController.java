package com.assignmenttracker.subject;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
	private final SubjectService subjectService;

	public SubjectController(SubjectService subjectService) {
		this.subjectService = subjectService;
	}

	@GetMapping
	public ResponseEntity<List<Subject>> list() {
		return ResponseEntity.ok(subjectService.list());
	}
}
