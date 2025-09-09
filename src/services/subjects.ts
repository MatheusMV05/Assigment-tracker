import { apiClient } from "@/lib/api";
import { Subject } from "@/types";

export const subjectsService = {
	async list(): Promise<Subject[]> {
		// O backend devolve Subject já no formato compatível
		return apiClient.get<Subject[]>(`/api/subjects`);
	},
};
