import { Plus, BookOpen, Calendar, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    name: "Nova Tarefa",
    description: "Adicionar uma nova tarefa",
    icon: Plus,
    gradient: "from-primary to-primary-glow",
    action: () => console.log("Nova tarefa"),
  },
  {
    name: "Nova Matéria",
    description: "Criar uma nova matéria",
    icon: BookOpen,
    gradient: "from-accent to-purple-500",
    action: () => console.log("Nova matéria"),
  },
  {
    name: "Ver Calendário",
    description: "Visualizar próximos prazos",
    icon: Calendar,
    gradient: "from-success to-emerald-500",
    action: () => console.log("Calendário"),
  },
  {
    name: "Relatórios",
    description: "Ver estatísticas detalhadas",
    icon: BarChart3,
    gradient: "from-warning to-orange-500",
    action: () => console.log("Relatórios"),
  },
];

export function QuickActions() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.name}
            variant="outline"
            className="h-auto p-4 justify-start hover:scale-105 transition-smooth border-muted hover:border-primary/50"
            onClick={action.action}
          >
            <div className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} mr-3`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">{action.name}</div>
              <div className="text-sm text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}