import { useEffect, useMemo, useState } from "react";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { tasksService } from "@/services/tasks";
import { Task, Subject } from "@/types";
import { TaskFormDialog, TaskFormValues } from "@/components/tasks/TaskFormDialog";
import { useToast } from "@/hooks/use-toast";
import { subjectsService } from "@/services/subjects";

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [subjectId, setSubjectId] = useState<string | "all">("all");
  const [priority, setPriority] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("dueDate");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [list, subs] = await Promise.all([tasksService.list(), subjectsService.list()]);
        setTasks(list);
        setSubjects(subs);
      } catch (e: any) {
        toast({ title: "Erro ao carregar dados", description: e?.message });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    let result = tasks.filter((t) => {
      const matchesText = !text || `${t.title} ${t.description ?? ""}`.toLowerCase().includes(text);
      const matchesSubject = subjectId === "all" || t.subject.id === subjectId;
      const matchesPriority = priority === "all" || t.priority === priority;
      return matchesText && matchesSubject && matchesPriority;
    });

    if (sortBy === "dueDate") {
      result = result.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    } else if (sortBy === "priority") {
      const order = { high: 0, medium: 1, low: 2 } as const;
      result = result.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return result;
  }, [tasks, query, subjectId, priority, sortBy]);

  const pendingTasks = filtered.filter((task) => task.status !== "completed");
  const completedTasks = filtered.filter((task) => task.status === "completed");

  const openCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: TaskFormValues) => {
    const subject = subjects.find((s) => s.id === values.subjectId)!;
    const payload: Partial<Task> = {
      title: values.title,
      description: values.description,
      subject,
      dueDate: new Date(values.dueDate),
      priority: values.priority,
      tags: values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      estimatedTime: values.estimatedTime,
      status: editingTask?.status ?? "todo",
    };

    try {
      if (editingTask) {
        const updated = await tasksService.update(editingTask.id, payload);
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        toast({ title: "Tarefa atualizada" });
      } else {
        const created = await tasksService.create(payload);
        setTasks((prev) => [created, ...prev]);
        toast({ title: "Tarefa criada" });
      }
    } catch (e: any) {
      toast({ title: "Erro ao salvar tarefa", description: e?.message });
    }
  };

  const handleDelete = async (task: Task) => {
    try {
      await tasksService.remove(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      toast({ title: "Tarefa excluída" });
    } catch (e: any) {
      toast({ title: "Erro ao excluir tarefa", description: e?.message });
    }
  };

  const handleStatusChange = async (taskId: string, status: Task["status"]) => {
    try {
      const updated = await tasksService.setStatus(taskId, status);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e: any) {
      toast({ title: "Erro ao atualizar status", description: e?.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Tarefas
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todas as suas tarefas acadêmicas
          </p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tarefas..."
            className="pl-10 bg-muted/50 border-muted focus:bg-background"
          />
        </div>
        <Select value={subjectId} onValueChange={(v) => setSubjectId(v)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Filtrar por matéria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as matérias</SelectItem>
            {subjects.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priority} onValueChange={(v) => setPriority(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Entrega</SelectItem>
            <SelectItem value="priority">Prioridade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task Sections */}
      <div className="space-y-8">
        {/* Pending Tasks */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold">Pendentes</h2>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              {pendingTasks.length}
            </Badge>
          </div>
          {loading ? (
            <div className="text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={openEdit} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
        </section>

        {/* Completed Tasks */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold">Concluídas</h2>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {completedTasks.length}
            </Badge>
          </div>
          {loading ? (
            <div className="text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={openEdit} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
        </section>
      </div>

      <TaskFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialTask={editingTask}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Tasks;