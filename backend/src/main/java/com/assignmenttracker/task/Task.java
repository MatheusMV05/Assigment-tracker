package com.assignmenttracker.task;

import com.assignmenttracker.subject.Subject;
import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	private String title;
	@Column(length = 2000)
	private String description;

	@ManyToOne(optional = false)
	private Subject subject;

	private LocalDate dueDate;

	@Enumerated(EnumType.STRING)
	private TaskPriority priority = TaskPriority.medium;

	@Enumerated(EnumType.STRING)
	private TaskStatus status = TaskStatus.to_do;

	@ElementCollection
	private List<String> tags = new ArrayList<>();

	private Double estimatedTime;
	private Double actualTime;

	@ElementCollection
	private List<String> attachments = new ArrayList<>();

	private Instant createdAt = Instant.now();
	private Instant updatedAt = Instant.now();

	@PreUpdate
	public void onUpdate() { this.updatedAt = Instant.now(); }

	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }
	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }
	public Subject getSubject() { return subject; }
	public void setSubject(Subject subject) { this.subject = subject; }
	public LocalDate getDueDate() { return dueDate; }
	public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
	public TaskPriority getPriority() { return priority; }
	public void setPriority(TaskPriority priority) { this.priority = priority; }
	public TaskStatus getStatus() { return status; }
	public void setStatus(TaskStatus status) { this.status = status; }
	public List<String> getTags() { return tags; }
	public void setTags(List<String> tags) { this.tags = tags; }
	public Double getEstimatedTime() { return estimatedTime; }
	public void setEstimatedTime(Double estimatedTime) { this.estimatedTime = estimatedTime; }
	public Double getActualTime() { return actualTime; }
	public void setActualTime(Double actualTime) { this.actualTime = actualTime; }
	public List<String> getAttachments() { return attachments; }
	public void setAttachments(List<String> attachments) { this.attachments = attachments; }
	public Instant getCreatedAt() { return createdAt; }
	public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
	public Instant getUpdatedAt() { return updatedAt; }
	public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
