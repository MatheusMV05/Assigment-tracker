import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Task, Priority, Subject } from "@/types";
import { subjectsService } from "@/services/subjects";

export interface TaskFormValues {
	title: string;
	description?: string;
	subjectId: string;
	dueDate: string; // yyyy-MM-dd
	priority: Priority;
	tags?: string;
	estimatedTime?: number;
}

interface TaskFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (values: TaskFormValues) => Promise<void> | void;
	initialTask?: Task | null;
}

export function TaskFormDialog({ open, onOpenChange, onSubmit, initialTask }: TaskFormDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [loadingSubjects, setLoadingSubjects] = useState(true);
	const [values, setValues] = useState<TaskFormValues>({
		title: "",
		description: "",
		subjectId: "",
		dueDate: new Date().toISOString().slice(0, 10),
		priority: "medium",
		tags: "",
		estimatedTime: undefined,
	});

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const list = await subjectsService.list();
				if (!mounted) return;
				setSubjects(list);
				// Definir matéria padrão se não houver inicial
				setValues((prev) => ({ ...prev, subjectId: prev.subjectId || list[0]?.id || "" }));
			} finally {
				if (mounted) setLoadingSubjects(false);
			}
		})();
		return () => { mounted = false; };
	}, []);

	useEffect(() => {
		if (initialTask) {
			setValues({
				title: initialTask.title,
				description: initialTask.description ?? "",
				subjectId: initialTask.subject.id,
				dueDate: initialTask.dueDate.toISOString().slice(0, 10),
				priority: initialTask.priority,
				tags: initialTask.tags?.join(", ") ?? "",
				estimatedTime: initialTask.estimatedTime,
			});
		}
	}, [initialTask]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSubmitting) return;
		setIsSubmitting(true);
		try {
			await onSubmit(values);
			onOpenChange(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{initialTask ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Título</Label>
						<Input id="title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} required />
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Descrição</Label>
						<Textarea id="description" value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} rows={4} />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Matéria</Label>
							<Select value={values.subjectId} onValueChange={(v) => setValues({ ...values, subjectId: v })}>
								<SelectTrigger disabled={loadingSubjects}>
									<SelectValue placeholder={loadingSubjects ? "Carregando..." : "Selecione a matéria"} />
								</SelectTrigger>
								<SelectContent>
									{subjects.map((s) => (
										<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="dueDate">Entrega</Label>
							<Input id="dueDate" type="date" value={values.dueDate} onChange={(e) => setValues({ ...values, dueDate: e.target.value })} required />
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Prioridade</Label>
							<Select value={values.priority} onValueChange={(v: Priority) => setValues({ ...values, priority: v })}>
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="high">Alta</SelectItem>
									<SelectItem value="medium">Média</SelectItem>
									<SelectItem value="low">Baixa</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="estimatedTime">Tempo estimado (h)</Label>
							<Input id="estimatedTime" type="number" min={0} step={0.5} value={values.estimatedTime ?? ""} onChange={(e) => setValues({ ...values, estimatedTime: e.target.value ? Number(e.target.value) : undefined })} />
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="tags">Tags (separadas por vírgula)</Label>
						<Input id="tags" value={values.tags} onChange={(e) => setValues({ ...values, tags: e.target.value })} />
					</div>

					<DialogFooter>
						<Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancelar</Button>
						<Button disabled={isSubmitting || loadingSubjects || !values.subjectId} type="submit">{isSubmitting ? "Salvando..." : "Salvar"}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
