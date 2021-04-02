import { createContext, ReactNode, useContext, useState } from 'react';
import qs from 'qs';

import { api } from '../services/api';

interface AuthState {
    token: string;
}

interface SignInInput {
    email: string;
    password: string;
}

interface AuthContextData {
    authState: AuthState;
    signIn(input: SignInInput): Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@FinancialControl:token');
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token };
        }

        return {} as AuthState;
    });

    async function signIn(input: SignInInput): Promise<void> {
        const response = await api({
            method: 'POST',
            url: '/api/v1/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({ 'email': input.email, 'password': input.password }),
        });

        const { token } = response.data
        setData({ token });

        localStorage.setItem('@FinancialControl:token', token);
        api.defaults.headers.authorization = `Bearer ${token}`;
    }

    return (
        <AuthContext.Provider value={{ signIn, authState: data }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
