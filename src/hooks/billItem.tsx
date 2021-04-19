import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Bill, BillItem } from '../models/bills';

interface BillItemProviderProps {
    children: ReactNode;
}

type NewBillItemInput = Omit<BillItem, 'id' | 'active'>;

interface BillItemContextData {
    billItemId: string;
    billItems: BillItem[];
    billItemInput: NewBillItemInput;
    isNewBillItemModalOpen: boolean;
    loadBillItems: (id: string) => Promise<void>;
    handleOpenNewBillItemModal: () => void;
    handleOpenEditBillItemModal: (id: string, input: NewBillItemInput) => void;
    handleCloseNewBillItemModal: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createBillItem(billId: string, input: NewBillItemInput): Promise<void>;
    updateBillItem(billId: string, id: string, input: NewBillItemInput): Promise<void>;
    handleCurrencyChange: (event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) => void;
}

const BillItemContext = createContext<BillItemContextData>({} as BillItemContextData);

export function BillItemProvider({ children }: BillItemProviderProps) {
    const [billItemId, setBillItemId] = useState('');
    const [billItems, setBillItems] = useState<BillItem[]>([]);
    const [isNewBillItemModalOpen, setIsNewBillItemModalOpen] = useState(false);
    const [billItemInput, setBillItemInput] = useState<NewBillItemInput>({} as NewBillItemInput);

    async function loadBillItems(id: string): Promise<void> {
        const response = await api.get<Bill>(`api/v1/Bills/${id}`);
        setBillItems(response.data.billItems ?? []);
    }

    async function createBillItem(billId: string, input: NewBillItemInput): Promise<void> {
        const response = await api.post<BillItem>(`api/v1/Bills/${billId}`, input);
        setBillItems([...billItems, response.data]);
    }

    async function updateBillItem(billId: string, id: string, input: NewBillItemInput): Promise<void> {
        await api.put<BillItem>(`api/v1/Bills/${billId}/items/${id}`, input);
        const response = await api.get<Bill>(`api/v1/Bills/${billId}`);
        setBillItems(response.data.billItems ?? []);
    }

    function handleOpenNewBillItemModal() {
        setIsNewBillItemModalOpen(true);
    }

    function handleOpenEditBillItemModal(id: string, input: NewBillItemInput) {
        setBillItemId(id);
        setBillItemInput(input);
        setIsNewBillItemModalOpen(true);
    }

    function handleCloseNewBillItemModal() {
        setBillItemId('');
        setBillItemInput({ title: '', value: 0 });
        setIsNewBillItemModalOpen(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setBillItemInput({
            ...billItemInput,
            [e.target.name]: e.target.value,
        });
    }

    function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) {
        setBillItemInput({
            ...billItemInput,
            value,
        });
    };

    return (
        <BillItemContext.Provider value={{
            billItemId,
            billItems,
            billItemInput,
            isNewBillItemModalOpen,
            loadBillItems,
            handleOpenNewBillItemModal,
            handleOpenEditBillItemModal,
            handleCloseNewBillItemModal,
            handleChange,
            handleCurrencyChange,
            createBillItem,
            updateBillItem,
        }}>
            {children}
        </BillItemContext.Provider>
    );
}

export function useBillItem(): BillItemContextData {
    const context = useContext(BillItemContext)
    if (!context) {
        throw new Error('useBillItem must be used within an BillItemProvider');
    }

    return context;
}
