import { ReactNode, createContext, useContext, useState } from 'react';

import { TransactionItem } from '../models/transactions';

interface TransactionItemProviderProps {
    children: ReactNode;
}

type NewTransactionItemInput = Omit<TransactionItem, 'id' | 'active'>;

interface TransactionItemContextData {
    transactionItemId: string;
    transactionItemInput: NewTransactionItemInput;
    isNewTransactionItemModalOpen: boolean;
    handleOpenNewTransactionItemModal: () => void;
    handleOpenEditTransactionItemModal: (id: string, input: NewTransactionItemInput) => void;
    handleCloseNewTransactionItemModal: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRadioClick: (type: string) => void;
    handleCurrencyChange: (event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) => void;
}

const TransactionItemContext = createContext<TransactionItemContextData>({} as TransactionItemContextData);

export function TransactionItemProvider({ children }: TransactionItemProviderProps) {
    const [transactionItemId, setTransactionItemId] = useState('');
    const [isNewTransactionItemModalOpen, setIsNewTransactionItemModalOpen] = useState(false);
    const [transactionItemInput, setTransactionItemInput] = useState<NewTransactionItemInput>({} as NewTransactionItemInput);

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
            transactionItemInput,
            isNewTransactionItemModalOpen,
            handleOpenNewTransactionItemModal,
            handleOpenEditTransactionItemModal,
            handleCloseNewTransactionItemModal,
            handleChange,
            handleRadioClick,
            handleCurrencyChange
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
