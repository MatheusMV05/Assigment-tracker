import { CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";

const stats = [
  {
    name: "Tarefas Concluídas",
    value: "24",
    change: "+12%",
    changeType: "positive",
    icon: CheckCircle,
    color: "success",
  },
  {
    name: "Pendentes",
    value: "8",
    change: "-4%",
    changeType: "positive",
    icon: Clock,
    color: "warning",
  },
  {
    name: "Próximos Prazos",
    value: "3",
    change: "2 hoje",
    changeType: "neutral",
    icon: AlertTriangle,
    color: "destructive",
  },
  {
    name: "Produtividade",
    value: "87%",
    change: "+5%",
    changeType: "positive",
    icon: TrendingUp,
    color: "primary",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="stats-card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
            </div>
            <div className={`
              p-3 rounded-xl transition-smooth group-hover:scale-110
              ${stat.color === 'success' ? 'bg-success/10 text-success' : ''}
              ${stat.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
              ${stat.color === 'destructive' ? 'bg-destructive/10 text-destructive' : ''}
              ${stat.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
            `}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}