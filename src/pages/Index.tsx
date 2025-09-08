import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { mockTasks } from "@/data/mockData";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo de volta! Aqui está o resumo das suas tarefas.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Upcoming Tasks */}
        <div className="lg:col-span-2">
          <UpcomingTasks tasks={mockTasks} />
        </div>
      </div>
    </div>
  );
};

export default Index;
