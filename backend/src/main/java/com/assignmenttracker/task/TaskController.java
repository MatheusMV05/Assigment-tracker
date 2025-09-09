package com.assignmenttracker.task;

import com.assignmenttracker.task.dto.CreateTaskDTO;
import com.assignmenttracker.task.dto.TaskDTO;
import com.assignmenttracker.task.dto.UpdateTaskDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	@GetMapping
	public ResponseEntity<List<TaskDTO>> list() {
		return ResponseEntity.ok(taskService.list());
	}

	@PostMapping
	public ResponseEntity<TaskDTO> create(@Valid @RequestBody CreateTaskDTO dto) {
		return ResponseEntity.ok(taskService.create(dto));
	}

	@PutMapping("/{id}")
	public ResponseEntity<TaskDTO> update(@PathVariable String id, @Valid @RequestBody UpdateTaskDTO dto) {
		return ResponseEntity.ok(taskService.update(id, dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		taskService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
