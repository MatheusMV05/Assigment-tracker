import { Priority, TaskStatus } from "./index";

export interface SubjectDTO {
	id: string;
	name: string;
	code?: string;
	color: string;
	professor?: string;
}

export interface TaskDTO {
	id: string;
	title: string;
	description?: string;
	subjectId: string;
	dueDate: string; // ISO
	priority: Priority;
	status: TaskStatus;
	tags: string[];
	estimatedTime?: number;
	actualTime?: number;
	attachments?: string[];
	createdAt: string; // ISO
	updatedAt: string; // ISO
}

export interface CreateTaskDTO {
	title: string;
	description?: string;
	subjectId: string;
	dueDate: string;
	priority: Priority;
	tags?: string[];
	estimatedTime?: number;
}

export interface UpdateTaskDTO {
	title?: string;
	description?: string;
	subjectId?: string;
	dueDate?: string;
	priority?: Priority;
	status?: TaskStatus;
	tags?: string[];
	estimatedTime?: number;
	actualTime?: number;
}
