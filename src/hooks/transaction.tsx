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
    transaction: Transaction;
    transactions: Transaction[];
    isNewTransactionModalOpen: boolean;
    handleOpenNewTransactionModal: () => void;
    handleCloseNewTransactionModal: () => void;
    loadTransactions: () => Promise<void>
    loadTransactionById: (id: string) => Promise<void>;
    createTransaction: (input: NewTransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transaction, setTransaction] = useState<Transaction>({} as Transaction);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    async function loadTransactions(): Promise<void> {
        const response = await api.get<Transaction[]>('api/v1/transactions');
        setTransactions(response.data);
    }

    async function loadTransactionById(id: string): Promise<void> {
        const response = await api.get<Transaction>(`api/v1/transactions/${id}`);
        setTransaction(response.data);
    }

    async function createTransaction(input: NewTransactionInput): Promise<void> {
        const response = await api.post<Transaction>('api/v1/transactions', input);
        setTransactions([...transactions, response.data]);
    }

    return (
        <TransactionsContext.Provider value={{
            transaction,
            transactions,
            isNewTransactionModalOpen,
            loadTransactions,
            createTransaction,
            loadTransactionById,
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal
        }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransaction(): TransactionsContextData {
    const context = useContext(TransactionsContext)
    if (!context) {
        throw new Error('useTransaction must be used within an TransactionProvider');
    }

    return context;
}
