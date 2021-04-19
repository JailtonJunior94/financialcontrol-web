import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Bill } from '../models/bills';

interface BillsProviderProps {
    children: ReactNode;
}

interface NewBillInput {
    date: Date;
}

interface BillsContextData {
    bills: Bill[];
    isNewBillModalOpen: boolean;
    handleOpenNewBillModal: () => void;
    handleCloseNewBillModal: () => void;
    loadBills: () => Promise<void>;
    createBill: (input: NewBillInput) => Promise<void>;
}

const BillsContext = createContext<BillsContextData>({} as BillsContextData);

export function BillsProvider({ children }: BillsProviderProps) {
    const [bills, setBills] = useState<Bill[]>([]);
    const [isNewBillModalOpen, setIsNewBillModalOpen] = useState(false);

    function handleOpenNewBillModal() {
        setIsNewBillModalOpen(true);
    }

    function handleCloseNewBillModal() {
        setIsNewBillModalOpen(false);
    }

    async function loadBills(): Promise<void> {
        const response = await api.get<Bill[]>('api/v1/bills');
        setBills(response.data);
    }

    async function createBill(input: NewBillInput): Promise<void> {
        const response = await api.post<Bill>('api/v1/bills', input);
        setBills([...bills, response.data]);
    }

    return (
        <BillsContext.Provider value={{
            bills,
            isNewBillModalOpen,
            loadBills,
            createBill,
            handleOpenNewBillModal,
            handleCloseNewBillModal
        }}>
            {children}
        </BillsContext.Provider>
    );
}

export function useBill(): BillsContextData {
    const context = useContext(BillsContext)
    if (!context) {
        throw new Error('useBill must be used within an BillProvider');
    }

    return context;
}
