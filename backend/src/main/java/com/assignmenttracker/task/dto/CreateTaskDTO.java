package com.assignmenttracker.task.dto;

import com.assignmenttracker.task.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public class CreateTaskDTO {
	@NotBlank
	public String title;
	public String description;
	@NotBlank
	public String subjectId;
	@NotNull
	public LocalDate dueDate;
	@NotNull
	public TaskPriority priority;
	public List<String> tags;
	public Double estimatedTime;
}
