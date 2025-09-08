import { mockSubjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, User, Calendar } from "lucide-react";

const Subjects = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Matérias
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize suas disciplinas e professores
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Nova Matéria
        </Button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockSubjects.map((subject) => (
          <Card key={subject.id} className="glass-card border-0 hover:scale-105 transition-smooth group cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: subject.color + '20' }}
                  >
                    <BookOpen 
                      className="w-5 h-5" 
                      style={{ color: subject.color }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    {subject.code && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {subject.code}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {subject.professor && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{subject.professor}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>3 tarefas pendentes</span>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: '75%',
                      backgroundColor: subject.color 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Subject Card */}
      <Card className="glass-card border-2 border-dashed border-muted hover:border-primary/50 transition-smooth cursor-pointer">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Adicionar Nova Matéria</h3>
            <p className="text-sm text-muted-foreground">
              Clique para criar uma nova disciplina
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subjects;