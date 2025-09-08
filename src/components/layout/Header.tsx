import { Bell, Menu, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas, matérias..."
            className="pl-10 bg-muted/50 border-muted focus:bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-medium">3</span>
          </div>
        </Button>
        
        <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Tarefa
        </Button>
      </div>
    </header>
  );
}