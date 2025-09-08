export const ROUTES = {
    HOME: "/",
    TASKS: "/tasks",
    SUBJECTS: "/subjects",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    NOT_FOUND: "/404"
} as const;

// Metadados das rotas para navegação
export const ROUTE_METADATA = {
    [ROUTES.HOME]: {
        title: "Dashboard",
        description: "Página inicial",
        requiresAuth: true
    },
    [ROUTES.TASKS]: {
        title: "Tarefas",
        description: "Gerenciar tarefas",
        requiresAuth: true
    },
    [ROUTES.SUBJECTS]: {
        title: "Matérias",
        description: "Gerenciar matérias",
        requiresAuth: true
    },
    [ROUTES.LOGIN]: {
        title: "Login",
        description: "Fazer login",
        requiresAuth: false
    },
    [ROUTES.REGISTER]: {
        title: "Cadastro",
        description: "Criar conta",
        requiresAuth: false
    }
} as const;