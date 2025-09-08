import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    user: any | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar se existe token no localStorage
        const token = localStorage.getItem("auth_token");
        if (token) {
            setIsAuthenticated(true);
            // Aqui você faria a validação do token com seu backend
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("auth_token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            login,
            logout,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
};