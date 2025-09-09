package com.assignmenttracker.task.dto;

import com.assignmenttracker.task.TaskPriority;
import com.assignmenttracker.task.TaskStatus;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public class TaskDTO {
	public String id;
	public String title;
	public String description;
	public String subjectId;
	public LocalDate dueDate;
	public TaskPriority priority;
	public TaskStatus status;
	public List<String> tags;
	public Double estimatedTime;
	public Double actualTime;
	public List<String> attachments;
	public Instant createdAt;
	public Instant updatedAt;
}
