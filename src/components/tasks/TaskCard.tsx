import { Calendar, Clock, Tag, MoreHorizontal } from "lucide-react";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onStatusChange }: TaskCardProps) {
  const isOverdue = task.dueDate < new Date() && task.status !== 'completed';
  const isDueToday = format(task.dueDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  const priorityConfig = {
    high: { class: 'priority-high', label: 'Alta' },
    medium: { class: 'priority-medium', label: 'Média' },
    low: { class: 'priority-low', label: 'Baixa' }
  };

  const statusConfig = {
    todo: { class: 'bg-muted text-muted-foreground', label: 'A Fazer' },
    'in-progress': { class: 'bg-warning/20 text-warning-foreground', label: 'Em Progresso' },
    completed: { class: 'bg-success/20 text-success-foreground', label: 'Concluída' }
  };

  return (
    <div className={cn(
      "glass-card p-4 transition-smooth hover:scale-[1.02] group cursor-pointer",
      task.status === 'completed' && "opacity-75",
      isOverdue && "border-destructive/50"
    )}
    onClick={() => onEdit?.(task)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: task.subject.color }}
          />
          <span className="text-sm font-medium text-muted-foreground">
            {task.subject.name}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{task.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className={cn(
            "flex items-center gap-1",
            isOverdue && "text-destructive",
            isDueToday && "text-warning"
          )}>
            <Calendar className="w-4 h-4" />
            <span>{format(task.dueDate, 'dd/MM', { locale: ptBR })}</span>
          </div>
          
          {task.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedTime}h</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Badge 
            className={cn("text-xs", statusConfig[task.status].class)}
          >
            {statusConfig[task.status].label}
          </Badge>
          <Badge 
            className={cn("text-xs", priorityConfig[task.priority].class)}
          >
            {priorityConfig[task.priority].label}
          </Badge>
        </div>
      </div>
    </div>
  );
}