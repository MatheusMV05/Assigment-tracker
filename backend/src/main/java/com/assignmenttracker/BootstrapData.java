package com.assignmenttracker;

import com.assignmenttracker.subject.Subject;
import com.assignmenttracker.subject.SubjectRepository;
import com.assignmenttracker.task.Task;
import com.assignmenttracker.task.TaskPriority;
import com.assignmenttracker.task.TaskRepository;
import com.assignmenttracker.task.TaskStatus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class BootstrapData implements CommandLineRunner {
	private final SubjectRepository subjectRepository;
	private final TaskRepository taskRepository;

	public BootstrapData(SubjectRepository subjectRepository, TaskRepository taskRepository) {
		this.subjectRepository = subjectRepository;
		this.taskRepository = taskRepository;
	}

	@Override
	public void run(String... args) {
		if (subjectRepository.count() == 0) {
			Subject math = new Subject();
			math.setName("Matemática");
			math.setCode("MAT101");
			math.setColor("#3B82F6");
			math.setProfessor("Prof. Silva");
			Subject history = new Subject();
			history.setName("História");
			history.setCode("HIS201");
			history.setColor("#8B5CF6");
			history.setProfessor("Prof. Santos");
			Subject physics = new Subject();
			physics.setName("Física");
			physics.setCode("FIS301");
			physics.setColor("#10B981");
			physics.setProfessor("Prof. Oliveira");
			subjectRepository.saveAll(List.of(math, history, physics));

			Task t1 = new Task();
			t1.setTitle("Resolver exercícios de álgebra");
			t1.setDescription("Capítulo 5, exercícios 1-20");
			t1.setSubject(math);
			t1.setDueDate(LocalDate.now().plusDays(3));
			t1.setPriority(TaskPriority.high);
			t1.setStatus(TaskStatus.to_do);

			Task t2 = new Task();
			t2.setTitle("Ensaio sobre Segunda Guerra Mundial");
			t2.setDescription("Análise dos principais eventos entre 1939-1945");
			t2.setSubject(history);
			t2.setDueDate(LocalDate.now().plusDays(5));
			t2.setPriority(TaskPriority.medium);
			t2.setStatus(TaskStatus.in_progress);

			Task t3 = new Task();
			t3.setTitle("Relatório de laboratório");
			t3.setDescription("Experimento sobre movimento uniformemente variado");
			t3.setSubject(physics);
			t3.setDueDate(LocalDate.now().plusDays(2));
			t3.setPriority(TaskPriority.high);
			t3.setStatus(TaskStatus.to_do);

			taskRepository.saveAll(List.of(t1, t2, t3));
		}
	}
}
