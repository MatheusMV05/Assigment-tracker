import { cn } from "@/lib/utils";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    className?: string;
}

export const AuthCard = ({ children, title, description, className }: AuthCardProps) => {
    return (
        <div className={cn("w-full", className)}>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {/* Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                {children}
            </div>

            {/* Footer decorative elements */}
            <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span>StudyFlow</span>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
            </div>
        </div>
    );
};