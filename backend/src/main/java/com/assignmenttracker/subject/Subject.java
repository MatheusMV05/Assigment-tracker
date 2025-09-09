package com.assignmenttracker.subject;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;
	private String name;
	private String code;
	private String color;
	private String professor;

	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	public String getCode() { return code; }
	public void setCode(String code) { this.code = code; }
	public String getColor() { return color; }
	public void setColor(String color) { this.color = color; }
	public String getProfessor() { return professor; }
	public void setProfessor(String professor) { this.professor = professor; }
}
