import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { SelectInput } from '../models/selectInput';
import { Category, Invoice, InvoiceItem } from '../models/invoices';

interface InvoicesProviderProps {
    children: ReactNode;
}

interface NewInvoiceInput {
    cardId: string;
    categoryId: string;
    purchaseDate: Date;
    totalAmount: number;
    quantityInvoice: number;
    description: string;
    tags: string;
}

interface InvoicesContextData {
    isLoading: boolean;
    invoices: Invoice[];
    categories: Category[];
    invoiceItems: InvoiceItem[];
    invoiceInput: NewInvoiceInput;
    isNewInvoiceModalOpen: boolean;
    loadCategories: () => Promise<void>;
    handleOpenNewInvoiceModal: () => void;
    handleCloseNewInvoiceModal: () => void;
    handleSelect: (e: SelectInput) => void;
    handleIsLoading: (loading: boolean) => void;
    loadInvoices: (cardId: string) => Promise<void>;
    createInvoice: (input: NewInvoiceInput) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loadInvoiceItems: (cardId: string, invoiceId: string) => Promise<void>;
    handleCurrencyChange: (event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) => void;
}

const InvoicesContext = createContext<InvoicesContextData>({} as InvoicesContextData);

export function InvoicesProvider({ children }: InvoicesProviderProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
    const [invoiceInput, setInvoiceInput] = useState<NewInvoiceInput>({} as NewInvoiceInput);

    function handleOpenNewInvoiceModal() {
        setIsNewInvoiceModalOpen(true);
    }

    function handleCloseNewInvoiceModal() {
        setIsNewInvoiceModalOpen(false);
        setInvoiceInput({
            cardId: '',
            categoryId: '',
            purchaseDate: new Date(),
            totalAmount: 0,
            quantityInvoice: 0,
            description: '',
            tags: ''
        });
    }

    function handleIsLoading(loading: boolean) {
        setIsLoading(loading)
    }

    async function loadCategories(): Promise<void> {
        const response = await api.get<Category[]>('api/v1/categories');
        setCategories(response.data);
    }

    async function loadInvoices(cardId: string): Promise<void> {
        const response = await api.get<Invoice[]>(`/api/v1/invoices?cardId=${cardId}`);
        setInvoices(response.data);
    }

    async function loadInvoiceItems(cardId: string, invoiceId: string): Promise<void> {
        const response = await api.get<InvoiceItem[]>(`api/v1/invoices/${invoiceId}`);
        setInvoiceItems(response.data);
    }

    async function createInvoice(input: NewInvoiceInput): Promise<void> {
        await api.post<Invoice>(`api/v1/invoices/${input.cardId}`, input);
        await loadInvoices(input.cardId);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInvoiceInput({
            ...invoiceInput,
            [e.target.name]: e.target.value,
        });
    }

    function handleSelect(e: SelectInput) {
        setInvoiceInput({
            ...invoiceInput,
            [e.name]: e.value,
        });
    }

    function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) {
        setInvoiceInput({
            ...invoiceInput,
            totalAmount: value,
        });
    };

    return (
        <InvoicesContext.Provider value={{
            invoices,
            isLoading,
            categories,
            invoiceInput,
            invoiceItems,
            isNewInvoiceModalOpen,
            loadInvoices,
            loadCategories,
            loadInvoiceItems,
            createInvoice,
            handleIsLoading,
            handleChange,
            handleSelect,
            handleCurrencyChange,
            handleOpenNewInvoiceModal,
            handleCloseNewInvoiceModal
        }}>
            {children}
        </InvoicesContext.Provider>
    );
}

export function useInvoice(): InvoicesContextData {
    const context = useContext(InvoicesContext)
    if (!context) {
        throw new Error('useInvoice must be used within an InvoiceProvider');
    }

    return context;
}
