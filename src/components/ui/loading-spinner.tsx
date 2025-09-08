import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    showText?: boolean;
    text?: string;
}

export const LoadingSpinner = ({
                                   size = "md",
                                   className,
                                   showText = false,
                                   text = "Carregando..."
                               }: LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            {/* Spinner */}
            <div className="relative">
                {/* Outer ring */}
                <div
                    className={cn(
                        "rounded-full border-4 border-muted animate-spin",
                        sizeClasses[size]
                    )}
                    style={{
                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--primary)/0.3))'
                    }}
                />

                {/* Inner glow effect */}
                <div
                    className={cn(
                        "absolute inset-1 rounded-full bg-gradient-primary opacity-20 blur-sm animate-pulse",
                        {
                            "inset-0.5": size === "sm",
                            "inset-1": size === "md",
                            "inset-2": size === "lg",
                            "inset-3": size === "xl"
                        }
                    )}
                />
            </div>

            {/* Loading text */}
            {showText && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium">
                        {text}
                    </p>
                    <div className="flex justify-center gap-1 mt-1">
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

// Variações específicas do LoadingSpinner
export const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <LoadingSpinner size="xl" showText text="Carregando página..." />
    </div>
);

export const ButtonSpinner = ({ className }: { className?: string }) => (
    <LoadingSpinner size="sm" className={cn("text-current", className)} />
);

export const CardLoader = () => (
    <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" showText />
    </div>
);