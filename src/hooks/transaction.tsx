import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Transaction } from '../models/transactions';

interface TransactionsProviderProps {
    children: ReactNode;
}

interface NewTransactionInput {
    date: Date;
}

interface TransactionsContextData {
    transactions: Transaction[];
    isNewTransactionModalOpen: boolean;
    handleOpenNewTransactionModal: () => void;
    handleCloseNewTransactionModal: () => void;
    createTransaction: (input: NewTransactionInput) => Promise<void>;
    loadTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([])

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    async function loadTransactions(): Promise<void> {
        const response = await api.get('api/v1/transactions');
        setTransactions(response.data);
    }

    async function createTransaction(input: NewTransactionInput): Promise<void> {
        const response = await api.post<Transaction>('api/v1/transactions', input);
        setTransactions([...transactions, response.data]);
    }

    return (
        <TransactionsContext.Provider value={{
            transactions,
            isNewTransactionModalOpen,
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal,
            createTransaction,
            loadTransactions
        }}>
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
