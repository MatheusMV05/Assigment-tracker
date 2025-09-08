import { GraduationCap, BookOpen, Target, TrendingUp } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex">
            {/* Left Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

            {/* Right Side - Visual/Branding */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-90" />

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/30 blur-xl" />
                    <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white/20 blur-lg" />
                    <div className="absolute bottom-40 left-32 w-40 h-40 rounded-full bg-white/25 blur-2xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm shadow-glow">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">StudyFlow</h1>
                                <p className="text-white/80">Organize seus estudos</p>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold leading-tight mb-4">
                            Transforme sua
                            <br />
                            <span className="text-white/90">jornada acadêmica</span>
                        </h2>

                        <p className="text-xl text-white/80 leading-relaxed">
                            A plataforma completa para gerenciar suas tarefas,
                            matérias e acompanhar seu progresso acadêmico.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                            <div className="p-2 rounded-lg bg-white/20">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Organize suas tarefas</h3>
                                <p className="text-sm text-white/70">Gerencie prazos e prioridades</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                            <div className="p-2 rounded-lg bg-white/20">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Controle suas matérias</h3>
                                <p className="text-sm text-white/70">Acompanhe cada disciplina</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                            <div className="p-2 rounded-lg bg-white/20">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Monitore seu progresso</h3>
                                <p className="text-sm text-white/70">Visualize sua evolução</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};