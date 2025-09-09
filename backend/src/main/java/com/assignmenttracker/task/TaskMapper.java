package com.assignmenttracker.task;

import com.assignmenttracker.subject.Subject;
import com.assignmenttracker.task.dto.CreateTaskDTO;
import com.assignmenttracker.task.dto.TaskDTO;
import com.assignmenttracker.task.dto.UpdateTaskDTO;

public class TaskMapper {
	public static TaskDTO toDto(Task task) {
		TaskDTO dto = new TaskDTO();
		dto.id = task.getId();
		dto.title = task.getTitle();
		dto.description = task.getDescription();
		dto.subjectId = task.getSubject() != null ? task.getSubject().getId() : null;
		dto.dueDate = task.getDueDate();
		dto.priority = task.getPriority();
		dto.status = task.getStatus();
		dto.tags = task.getTags();
		dto.estimatedTime = task.getEstimatedTime();
		dto.actualTime = task.getActualTime();
		dto.attachments = task.getAttachments();
		dto.createdAt = task.getCreatedAt();
		dto.updatedAt = task.getUpdatedAt();
		return dto;
	}

	public static Task fromCreateDto(CreateTaskDTO dto, Subject subject) {
		Task task = new Task();
		task.setTitle(dto.title);
		task.setDescription(dto.description);
		task.setSubject(subject);
		task.setDueDate(dto.dueDate);
		task.setPriority(dto.priority);
		task.setTags(dto.tags);
		task.setEstimatedTime(dto.estimatedTime);
		return task;
	}

	public static void applyUpdate(Task task, UpdateTaskDTO dto, Subject subject) {
		if (dto.title != null) task.setTitle(dto.title);
		if (dto.description != null) task.setDescription(dto.description);
		if (subject != null) task.setSubject(subject);
		if (dto.dueDate != null) task.setDueDate(dto.dueDate);
		if (dto.priority != null) task.setPriority(dto.priority);
		if (dto.status != null) task.setStatus(dto.status);
		if (dto.tags != null) task.setTags(dto.tags);
		if (dto.estimatedTime != null) task.setEstimatedTime(dto.estimatedTime);
		if (dto.actualTime != null) task.setActualTime(dto.actualTime);
	}
}
