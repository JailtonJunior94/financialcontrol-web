import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Transaction, TransactionItem } from '../models/transactions';

interface TransactionsProviderProps {
    children: ReactNode;
}

interface NewTransactionInput {
    date: Date;
}

type NewTransactionItemInput = Omit<TransactionItem, 'id' | 'active'>;

interface TransactionsContextData {
    transaction: Transaction;
    transactions: Transaction[];
    transactionItems: TransactionItem[];
    isNewTransactionModalOpen: boolean;
    handleOpenNewTransactionModal: () => void;
    handleCloseNewTransactionModal: () => void;
    loadTransactions: () => Promise<void>
    loadTransactionById: (id: string) => Promise<void>;
    createTransaction: (input: NewTransactionInput) => Promise<void>;
    cloneTransaction: (transactionId: string) => Promise<void>;
    createTransactionItem: (transactionId: string, input: NewTransactionItemInput) => Promise<void>
    updateTransactionItem: (transactionId: string, id: string, input: NewTransactionItemInput) => Promise<void>
    markAsPaidTransactionItem: (transactionId: string, id: string, markAsPaid: boolean) => Promise<void>
    removeTransactionItem: (transactionId: string, id: string) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transaction, setTransaction] = useState<Transaction>({} as Transaction);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([]);
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
        setTransactionItems(response.data.items ?? []);
    }

    async function createTransaction(input: NewTransactionInput): Promise<void> {
        const response = await api.post<Transaction>('api/v1/transactions', input);
        setTransactions([...transactions, response.data]);
    }

    async function cloneTransaction(transactionId: string): Promise<void> {
        await api.post<Transaction>(`api/v1/transactions/${transactionId}/clone`);
        loadTransactions()
    }

    async function createTransactionItem(transactionId: string, input: NewTransactionItemInput): Promise<void> {
        await api.post<TransactionItem>(`api/v1/transactions/${transactionId}`, input);
        await loadTransactionById(transactionId)
    }

    async function updateTransactionItem(transactionId: string, id: string, input: NewTransactionItemInput): Promise<void> {
        await api.put<TransactionItem>(`api/v1/transactions/${transactionId}/items/${id}`, input);
        await loadTransactionById(transactionId)
    }

    async function markAsPaidTransactionItem(transactionId: string, id: string, markAsPaid: boolean): Promise<void> {
        await api.patch(`api/v1/transactions/${transactionId}/items/${id}`, { markAsPaid });
        await loadTransactionById(transactionId)
    }

    async function removeTransactionItem(transactionId: string, id: string): Promise<void> {
        await api.delete(`api/v1/transactions/${transactionId}/items/${id}`);
        await loadTransactionById(transactionId)
    }

    return (
        <TransactionsContext.Provider value={{
            transaction,
            transactions,
            transactionItems,
            isNewTransactionModalOpen,
            loadTransactions,
            createTransaction,
            cloneTransaction,
            loadTransactionById,
            createTransactionItem,
            updateTransactionItem,
            removeTransactionItem,
            markAsPaidTransactionItem,
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
