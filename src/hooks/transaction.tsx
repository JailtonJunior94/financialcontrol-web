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
    itemId: string;
    title: string;
    value: number;
    type: string;
    transactions: Transaction[];
    isNewTransactionModalOpen: boolean;
    transactionItems: TransactionItem[];
    isNewTransactionItemModalOpen: boolean;
    handleOpenNewTransactionModal: () => void;
    handleCloseNewTransactionModal: () => void;
    createTransaction: (input: NewTransactionInput) => Promise<void>;
    loadTransactions: () => Promise<void>;
    loadTransactionItems: (id: string) => Promise<void>;
    handleOpenNewTransactionItemModal: () => void;
    handleCloseNewTransactionItemModal: () => void;
    createTransactionItem(transactionId: string, input: NewTransactionItemInput): Promise<void>;
    updateTransactionItem(transactionId: string, id: string, input: NewTransactionItemInput): Promise<void>;
    handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleType: (type: string) => void;
    handleOpenEditTransactionItemModal: (id: string, input: NewTransactionItemInput) => void;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([]);
    const [isNewTransactionItemModalOpen, setIsNewTransactionItemModalOpen] = useState(false);
    const [itemId, setItemId] = useState('');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [type, setType] = useState('INCOME');

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

    async function loadTransactionItems(id: string): Promise<void> {
        const response = await api.get<Transaction>(`api/v1/transactions/${id}`);
        setTransactionItems(response.data.items ?? []);
    }

    async function createTransaction(input: NewTransactionInput): Promise<void> {
        const response = await api.post<Transaction>('api/v1/transactions', input);
        setTransactions([...transactions, response.data]);
    }

    async function createTransactionItem(transactionId: string, input: NewTransactionItemInput): Promise<void> {
        const response = await api.post<TransactionItem>(`api/v1/transactions/${transactionId}`, input);
        setTransactionItems([...transactionItems, response.data]);
    }

    async function updateTransactionItem(transactionId: string, id: string, input: NewTransactionItemInput): Promise<void> {
        await api.put<TransactionItem>(`api/v1/transactions/${transactionId}/items/${id}`, input);
        const response = await api.get<Transaction>(`api/v1/transactions/${transactionId}`);
        setTransactionItems(response.data.items ?? []);
    }

    function handleOpenNewTransactionItemModal() {
        setItemId('')
        setTitle('');
        setValue(0);
        setType('INCOME');
        setIsNewTransactionItemModalOpen(true);
    }

    function handleCloseNewTransactionItemModal() {
        setIsNewTransactionItemModalOpen(false);
    }

    function handleOpenEditTransactionItemModal(id: string, input: NewTransactionItemInput) {
        setItemId(id)
        setTitle(input.title)
        setValue(input.value);
        setType(input.type);
        setIsNewTransactionItemModalOpen(true);
    }

    function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleValue(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(Number(e.target.value));
    }

    function handleType(type: string) {
        setType(type);
    }

    return (
        <TransactionsContext.Provider value={{
            title,
            value,
            type,
            itemId,
            transactions,
            transactionItems,
            isNewTransactionModalOpen,
            isNewTransactionItemModalOpen,
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal,
            createTransaction,
            loadTransactions,
            loadTransactionItems,
            handleOpenNewTransactionItemModal,
            handleCloseNewTransactionItemModal,
            createTransactionItem,
            updateTransactionItem,
            handleOpenEditTransactionItemModal,
            handleTitle,
            handleValue,
            handleType
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
