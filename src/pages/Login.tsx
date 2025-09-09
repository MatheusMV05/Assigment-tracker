import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Simulação de autenticação. Trocar por chamada à API quando disponível
      if (!formData.email || !formData.password) {
        throw new Error("Preencha email e senha");
      }

      // Exemplo de validação simples
      const fakeToken = "demo-token";
      login(fakeToken);

      toast({
        title: "Login realizado",
        description: "Bem-vindo de volta!",
      });

      navigate("/", { replace: true });
    } catch (error: any) {
      toast({
        title: "Falha no login",
        description: error?.message || "Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Assignment Tracker</h1>
          <p className="text-muted-foreground mt-2">Organize seus estudos com eficiência</p>
        </div>

        {/* Login Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Lembrar de mim
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <Button disabled={isSubmitting} type="submit" className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity">
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Não tem uma conta? </span>
              <Link
                to="/auth/register"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 Assignment Tracker. Desenvolvido para estudantes.</p>
        </div>
      </div>
    </div>
  );
}