import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  Settings,
  Plus,
  User
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tarefas', href: '/tasks', icon: CheckSquare },
  { name: 'Calendário', href: '/calendar', icon: Calendar },
  { name: 'Matérias', href: '/subjects', icon: BookOpen },
  { name: 'Relatórios', href: '/reports', icon: BarChart3 },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "flex flex-col bg-card border-r border-border transition-all duration-300",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
                Assignment
              </h1>
              <p className="text-xs text-muted-foreground">Tracker</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth",
                "hover:bg-accent/20 hover:text-accent-foreground",
                isActive && "bg-gradient-primary text-white shadow-glow",
                !isOpen && "justify-center"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
        
        {/* Quick Add Button */}
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
          "bg-accent hover:bg-accent/80 text-accent-foreground transition-smooth",
          "border-2 border-dashed border-accent/50 hover:border-accent",
          !isOpen && "justify-center"
        )}>
          <Plus className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Nova Tarefa</span>}
        </button>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-smooth",
          "hover:bg-muted",
          !isOpen && "justify-center"
        )}>
          <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          {isOpen && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Estudante</p>
              <p className="text-xs text-muted-foreground truncate">estudante@email.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}