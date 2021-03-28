import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface Transaction {
    id: string;
    date: Date;
    total: number;
    income: number;
    outcome: number;
    active: boolean;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[]
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get<Transaction[]>('api/v1/transactions')
            .then(response => {
                setTransactions(response.data)
            });
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransaction() {
    const context = useContext(TransactionsContext)
    if (!context) {
        throw new Error('useTransaction must be used within an AuthProvider');
    }

    return context;
}
