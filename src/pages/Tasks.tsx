import { TaskCard } from "@/components/tasks/TaskCard";
import { mockTasks } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";

const Tasks = () => {
  const pendingTasks = mockTasks.filter(task => task.status !== 'completed');
  const completedTasks = mockTasks.filter(task => task.status === 'completed');

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
        <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            className="pl-10 bg-muted/50 border-muted focus:bg-background"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por matéria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as matérias</SelectItem>
            <SelectItem value="math">Matemática</SelectItem>
            <SelectItem value="history">História</SelectItem>
            <SelectItem value="physics">Física</SelectItem>
          </SelectContent>
        </Select>
        <Select>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>

        {/* Completed Tasks */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold">Concluídas</h2>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {completedTasks.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tasks;