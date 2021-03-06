import { ReactNode, createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid_v4 } from "uuid";

import { ToastContainer } from '../components/ToastContainer';

interface ToastProviderProps {
    children: ReactNode;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info';
    title: string;
    description: string;
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps) {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid_v4();

        const message = {
            id,
            type,
            title,
            description
        }

        setMessages(oldMessages => [...oldMessages, message]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within an AuthProvider');
    }

    return context;
}
