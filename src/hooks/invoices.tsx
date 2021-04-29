import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Invoice, InvoiceItem } from '../models/invoices';

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
    invoices: Invoice[];
    invoiceItems: InvoiceItem[];
    isLoading: boolean;
    isNewInvoiceModalOpen: boolean;
    handleIsLoading: (loading: boolean) => void;
    handleOpenNewInvoiceModal: () => void;
    handleCloseNewInvoiceModal: () => void;
    loadInvoices: (cardId: string) => Promise<void>;
    loadInvoiceItems: (cardId: string, invoiceId: string) => Promise<void>;
    createInvoice: (input: NewInvoiceInput) => Promise<void>;
}

const InvoicesContext = createContext<InvoicesContextData>({} as InvoicesContextData);

export function InvoicesProvider({ children }: InvoicesProviderProps) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);

    function handleOpenNewInvoiceModal() {
        setIsNewInvoiceModalOpen(true);
    }

    function handleCloseNewInvoiceModal() {
        setIsNewInvoiceModalOpen(false);
    }

    function handleIsLoading(loading: boolean) {
        setIsLoading(loading)
    }

    async function loadInvoices(cardId: string): Promise<void> {
        const response = await api.get<Invoice[]>(`api/v1/cards/${cardId}/invoices`);
        setInvoices(response.data);
    }

    async function loadInvoiceItems(cardId: string, invoiceId: string): Promise<void> {
        const response = await api.get<InvoiceItem[]>(`api/v1/cards/${cardId}/invoices/${invoiceId}`);
        setInvoiceItems(response.data);
    }

    async function createInvoice(input: NewInvoiceInput): Promise<void> {
        const response = await api.post<Invoice>(`api/v1/cards/${input.cardId}/invoices`, input);
        setInvoices([...invoices, response.data]);
    }

    return (
        <InvoicesContext.Provider value={{
            invoices,
            invoiceItems,
            isLoading,
            isNewInvoiceModalOpen,
            loadInvoices,
            loadInvoiceItems,
            createInvoice,
            handleIsLoading,
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
