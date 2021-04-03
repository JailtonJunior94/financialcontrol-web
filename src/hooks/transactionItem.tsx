import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Transaction, TransactionItem } from '../models/transactions';

interface TransactionItemProviderProps {
    children: ReactNode;
}

type NewTransactionItemInput = Omit<TransactionItem, 'id' | 'active'>;

interface TransactionItemContextData {
    transactionItemId: string;
    transactionItems: TransactionItem[];
    transactionItemInput: NewTransactionItemInput;
    isNewTransactionItemModalOpen: boolean;
    loadTransactionItems: (id: string) => Promise<void>;
    handleOpenNewTransactionItemModal: () => void;
    handleOpenEditTransactionItemModal: (id: string, input: NewTransactionItemInput) => void;
    handleCloseNewTransactionItemModal: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRadioClick: (type: string) => void;
    createTransactionItem(transactionId: string, input: NewTransactionItemInput): Promise<void>;
    updateTransactionItem(transactionId: string, id: string, input: NewTransactionItemInput): Promise<void>;
    handleCurrencyChange: (event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) => void;
}

const TransactionItemContext = createContext<TransactionItemContextData>({} as TransactionItemContextData);

export function TransactionItemProvider({ children }: TransactionItemProviderProps) {
    const [transactionItemId, setTransactionItemId] = useState('');
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([]);
    const [isNewTransactionItemModalOpen, setIsNewTransactionItemModalOpen] = useState(false);
    const [transactionItemInput, setTransactionItemInput] = useState<NewTransactionItemInput>({} as NewTransactionItemInput);

    async function loadTransactionItems(id: string): Promise<void> {
        const response = await api.get<Transaction>(`api/v1/transactions/${id}`);
        setTransactionItems(response.data.items ?? []);
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
        setIsNewTransactionItemModalOpen(true);
    }

    function handleOpenEditTransactionItemModal(id: string, input: NewTransactionItemInput) {
        setTransactionItemId(id);
        setTransactionItemInput(input);
        setIsNewTransactionItemModalOpen(true);
    }

    function handleCloseNewTransactionItemModal() {
        setTransactionItemId('');
        setTransactionItemInput({ title: '', value: 0, type: 'INCOME' });
        setIsNewTransactionItemModalOpen(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTransactionItemInput({
            ...transactionItemInput,
            [e.target.name]: e.target.value,
        });
    }

    function handleRadioClick(type: string) {
        setTransactionItemInput({
            ...transactionItemInput,
            type: type,
        });
    }

    function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) {
        setTransactionItemInput({
            ...transactionItemInput,
            value,
        });
    };

    return (
        <TransactionItemContext.Provider value={{
            transactionItemId,
            transactionItems,
            transactionItemInput,
            isNewTransactionItemModalOpen,
            loadTransactionItems,
            handleOpenNewTransactionItemModal,
            handleOpenEditTransactionItemModal,
            handleCloseNewTransactionItemModal,
            handleChange,
            handleRadioClick,
            handleCurrencyChange,
            createTransactionItem,
            updateTransactionItem,
        }}>
            {children}
        </TransactionItemContext.Provider>
    );
}

export function useTransactionItem(): TransactionItemContextData {
    const context = useContext(TransactionItemContext)
    if (!context) {
        throw new Error('useTransactionItem must be used within an TransactionItemProvider');
    }

    return context;
}
