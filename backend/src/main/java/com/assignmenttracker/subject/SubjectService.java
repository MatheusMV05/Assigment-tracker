package com.assignmenttracker.subject;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
	private final SubjectRepository subjectRepository;

	public SubjectService(SubjectRepository subjectRepository) {
		this.subjectRepository = subjectRepository;
	}

	public List<Subject> list() {
		return subjectRepository.findAll();
	}
}
