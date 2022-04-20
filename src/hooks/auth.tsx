import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import qs from 'qs';

import { api } from '../services/api';
import { User } from '../models/user';

interface AuthState {
    token: string;
    user: User;
}

export interface SignInInput {
    email: string;
    password: string;
}

interface AuthContextData {
    authState: AuthState;
    user: User;
    signIn(input: SignInInput): Promise<void>;
    signOut(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@FinancialControl:token');
        const user = localStorage.getItem("@FinancialControl:user");

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api({
            method: 'POST',
            url: '/api/v1/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({ 'email': email, 'password': password }),
        });

        const { token } = response.data

        localStorage.setItem('@FinancialControl:token', token);
        api.defaults.headers.authorization = `Bearer ${token}`;

        const responseMe = await api.get<User>('/api/v1/me')
        localStorage.setItem("@FinancialControl:user", JSON.stringify(responseMe.data));

        setData({ token, user: responseMe.data });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@FinancialControl:token");
        localStorage.removeItem("@FinancialControl:user");

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, authState: data, user: data.user, signOut }}>
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
