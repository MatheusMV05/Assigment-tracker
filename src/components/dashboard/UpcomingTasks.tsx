import { Task } from "@/types";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Calendar, Clock } from "lucide-react";

interface UpcomingTasksProps {
  tasks: Task[];
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  // Sort tasks by due date and take the next 5
  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 5);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Próximas Entregas</h2>
      </div>

      {upcomingTasks.length > 0 ? (
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma tarefa pendente</p>
          <p className="text-sm text-muted-foreground">Parabéns! Você está em dia!</p>
        </div>
      )}
    </div>
  );
}