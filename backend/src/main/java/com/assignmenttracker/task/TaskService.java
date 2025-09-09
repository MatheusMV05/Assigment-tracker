package com.assignmenttracker.task;

import com.assignmenttracker.subject.Subject;
import com.assignmenttracker.subject.SubjectRepository;
import com.assignmenttracker.task.dto.CreateTaskDTO;
import com.assignmenttracker.task.dto.TaskDTO;
import com.assignmenttracker.task.dto.UpdateTaskDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {
	private final TaskRepository taskRepository;
	private final SubjectRepository subjectRepository;

	public TaskService(TaskRepository taskRepository, SubjectRepository subjectRepository) {
		this.taskRepository = taskRepository;
		this.subjectRepository = subjectRepository;
	}

	@Transactional(readOnly = true)
	public List<TaskDTO> list() {
		return taskRepository.findAll().stream().map(TaskMapper::toDto).toList();
	}

	@Transactional
	public TaskDTO create(CreateTaskDTO dto) {
		Subject subject = subjectRepository.findById(dto.subjectId)
				.orElseThrow(() -> new IllegalArgumentException("Subject não encontrado"));
		Task task = TaskMapper.fromCreateDto(dto, subject);
		Task saved = taskRepository.save(task);
		return TaskMapper.toDto(saved);
	}

	@Transactional
	public TaskDTO update(String id, UpdateTaskDTO dto) {
		Task task = taskRepository.findById(id).orElseThrow();
		Subject subject = null;
		if (dto.subjectId != null) {
			subject = subjectRepository.findById(dto.subjectId)
					.orElseThrow(() -> new IllegalArgumentException("Subject não encontrado"));
		}
		TaskMapper.applyUpdate(task, dto, subject);
		return TaskMapper.toDto(task);
	}

	@Transactional
	public void delete(String id) {
		taskRepository.deleteById(id);
	}
}
