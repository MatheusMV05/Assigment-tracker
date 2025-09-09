import { apiClient } from "@/lib/api";
import { Task } from "@/types";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "@/types/dto";
import { mockTasks, mockSubjects } from "@/data/mockData";

const useMock = () => !((import.meta as any)?.env?.VITE_API_BASE_URL);

type BackendStatus = "to_do" | "in_progress" | "completed";

function mapStatusFromBackend(status: BackendStatus): Task["status"] {
	if (status === "to_do") return "todo";
	if (status === "in_progress") return "in-progress";
	return "completed";
}

function mapStatusToBackend(status?: Task["status"]): BackendStatus | undefined {
	if (!status) return undefined;
	if (status === "todo") return "to_do";
	if (status === "in-progress") return "in_progress";
	return "completed";
}

function fromDto(dto: TaskDTO): Task {
	const subject = mockSubjects.find(s => s.id === (dto as any).subjectId) ?? {
		id: (dto as any).subjectId,
		name: "Matéria",
		color: "#999999",
	};
	return {
		id: dto.id,
		title: dto.title,
		description: dto.description,
		subject,
		dueDate: new Date(dto.dueDate as unknown as string),
		priority: dto.priority as Task["priority"],
		status: mapStatusFromBackend(dto.status as unknown as BackendStatus),
		tags: dto.tags,
		estimatedTime: dto.estimatedTime,
		actualTime: dto.actualTime,
		attachments: dto.attachments,
		createdAt: new Date(dto.createdAt as unknown as string),
		updatedAt: new Date(dto.updatedAt as unknown as string),
	};
}

function toCreateDto(task: Partial<Task>): CreateTaskDTO {
	return {
		title: task.title!,
		description: task.description,
		subjectId: task.subject!.id,
		dueDate: task.dueDate!.toISOString().slice(0, 10),
		priority: task.priority!,
		tags: task.tags ?? [],
		estimatedTime: task.estimatedTime,
	};
}

function toUpdateDto(task: Partial<Task>): UpdateTaskDTO {
	return {
		title: task.title,
		description: task.description,
		subjectId: task.subject?.id,
		dueDate: task.dueDate ? task.dueDate.toISOString().slice(0, 10) : undefined,
		priority: task.priority,
		status: mapStatusToBackend(task.status) as unknown as any,
		tags: task.tags,
		estimatedTime: task.estimatedTime,
		actualTime: task.actualTime,
	};
}

export const tasksService = {
	async list(): Promise<Task[]> {
		if (useMock()) {
			return mockTasks;
		}
		const data = await apiClient.get<TaskDTO[]>(`/api/tasks`);
		return data.map(fromDto);
	},

	async create(task: Partial<Task>): Promise<Task> {
		if (useMock()) {
			const created: Task = {
				...task as Task,
				id: String(Date.now()),
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			mockTasks.push(created);
			return created;
		}
		const dto = toCreateDto(task);
		const res = await apiClient.post<CreateTaskDTO, TaskDTO>(`/api/tasks`, dto);
		return fromDto(res);
	},

	async update(id: string, task: Partial<Task>): Promise<Task> {
		if (useMock()) {
			const idx = mockTasks.findIndex(t => t.id === id);
			if (idx >= 0) {
				mockTasks[idx] = { ...mockTasks[idx], ...task, updatedAt: new Date() } as Task;
				return mockTasks[idx];
			}
			throw new Error("Task não encontrada");
		}
		const dto = toUpdateDto(task);
		const res = await apiClient.put<UpdateTaskDTO, TaskDTO>(`/api/tasks/${id}`, dto);
		return fromDto(res);
	},

	async remove(id: string): Promise<void> {
		if (useMock()) {
			const idx = mockTasks.findIndex(t => t.id === id);
			if (idx >= 0) mockTasks.splice(idx, 1);
			return;
		}
		await apiClient.delete<void>(`/api/tasks/${id}`);
	},

	async setStatus(id: string, status: Task["status"]): Promise<Task> {
		return this.update(id, { status });
	},
};
