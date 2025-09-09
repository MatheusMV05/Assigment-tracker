export interface ApiClientOptions {
	baseUrl?: string;
}

export class ApiClient {
	private readonly baseUrl: string;

	constructor(options?: ApiClientOptions) {
		const envBase = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
		this.baseUrl = options?.baseUrl ?? envBase ?? "http://localhost:8080";
	}

	private buildHeaders(extra?: HeadersInit): HeadersInit {
		const token = localStorage.getItem("auth_token");
		return {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...extra,
		};
	}

	async get<T>(path: string): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`);
		if (!res.ok) throw new Error(`GET ${path} falhou: ${res.status}`);
		return (await res.json()) as T;
	}

	async post<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers: this.buildHeaders(),
			body: JSON.stringify(body),
		});
		if (!res.ok) throw new Error(`POST ${path} falhou: ${res.status}`);
		return (await res.json()) as TRes;
	}

	async put<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "PUT",
			headers: this.buildHeaders(),
			body: JSON.stringify(body),
		});
		if (!res.ok) throw new Error(`PUT ${path} falhou: ${res.status}`);
		return (await res.json()) as TRes;
	}

	async patch<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "PATCH",
			headers: this.buildHeaders(),
			body: JSON.stringify(body),
		});
		if (!res.ok) throw new Error(`PATCH ${path} falhou: ${res.status}`);
		return (await res.json()) as TRes;
	}

	async delete<TRes>(path: string): Promise<TRes> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method: "DELETE",
			headers: this.buildHeaders(),
		});
		if (!res.ok) throw new Error(`DELETE ${path} falhou: ${res.status}`);
		try {
			return (await res.json()) as TRes;
		} catch {
			return undefined as unknown as TRes;
		}
	}
}

export const apiClient = new ApiClient();
