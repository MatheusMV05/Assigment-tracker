import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy loading das páginas
const Index = lazy(() => import("@/pages/Index"));
const Tasks = lazy(() => import("@/pages/Tasks"));
const Subjects = lazy(() => import("@/pages/Subjects"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Componente de Loading
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
    </div>
);

// Wrapper para Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<PageLoader />}>
        {children}
    </Suspense>
);

// Rotas públicas (sem autenticação)
const PublicRoutes = () => (
    <Routes>
        <Route path="/login" element={
            <SuspenseWrapper>
                <AuthLayout>
                    <Login />
                </AuthLayout>
            </SuspenseWrapper>
        } />
        <Route path="/register" element={
            <SuspenseWrapper>
                <AuthLayout>
                    <Register />
                </AuthLayout>
            </SuspenseWrapper>
        } />
    </Routes>
);

// Rotas protegidas (requerem autenticação)
const PrivateRoutes = () => (
    <Routes>
        <Route path="/" element={
            <ProtectedRoute>
                <AppLayout>
                    <SuspenseWrapper>
                        <Index />
                    </SuspenseWrapper>
                </AppLayout>
            </ProtectedRoute>
        } />

        <Route path="/tasks" element={
            <ProtectedRoute>
                <AppLayout>
                    <SuspenseWrapper>
                        <Tasks />
                    </SuspenseWrapper>
                </AppLayout>
            </ProtectedRoute>
        } />

        <Route path="/subjects" element={
            <ProtectedRoute>
                <AppLayout>
                    <SuspenseWrapper>
                        <Subjects />
                    </SuspenseWrapper>
                </AppLayout>
            </ProtectedRoute>
        } />
    </Routes>
);

// Rotas principais
export const AppRoutes = () => (
    <Routes>
        {/* Rotas de autenticação */}
        <Route path="/auth/*" element={<PublicRoutes />} />

        {/* Rotas principais da aplicação */}
        <Route path="/*" element={<PrivateRoutes />} />

        {/* Rota 404 */}
        <Route path="*" element={
            <SuspenseWrapper>
                <NotFound />
            </SuspenseWrapper>
        } />
    </Routes>
);