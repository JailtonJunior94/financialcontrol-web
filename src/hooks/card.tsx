import { ReactNode, createContext, useContext, useState } from 'react';

import { api } from '../services/api';
import { Card, Flag } from '../models/cards';

interface CardsProviderProps {
    children: ReactNode;
}

interface NewCardInput {
    flagId: string;
    name: string;
    number: string;
    description: string;
    closingDay: number;
    expirationDate: Date;
}

interface SelectInput {
    value: string | ''
    name: string | ''
}

interface CardsContextData {
    cards: Card[];
    flags: Flag[];
    cardInput: NewCardInput;
    isNewCardModalOpen: boolean;
    handleOpenNewCardModal: () => void;
    handleCloseNewCardModal: () => void;
    loadCards: () => Promise<void>;
    loadFlags: () => Promise<void>;
    createCard: (input: NewCardInput) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelect: (e: SelectInput) => void;
}

const CardsContext = createContext<CardsContextData>({} as CardsContextData);

export function CardsProvider({ children }: CardsProviderProps) {
    const [cards, setCards] = useState<Card[]>([]);
    const [flags, setFlags] = useState<Flag[]>([]);
    const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
    const [cardInput, setCardInput] = useState<NewCardInput>({} as NewCardInput);

    function handleOpenNewCardModal() {
        setIsNewCardModalOpen(true);
    }

    function handleCloseNewCardModal() {
        setIsNewCardModalOpen(false);
    }

    async function loadFlags(): Promise<void> {
        const response = await api.get<Flag[]>('api/v1/flags');
        setFlags(response.data);
    }

    async function loadCards(): Promise<void> {
        const response = await api.get<Card[]>('api/v1/cards');
        setCards(response.data);
    }

    async function createCard(input: NewCardInput): Promise<void> {
        const response = await api.post<Card>('api/v1/cards', input);
        setCards([...cards, response.data]);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCardInput({
            ...cardInput,
            [e.target.name]: e.target.value,
        });
    }

    function handleSelect(e: SelectInput) {
        setCardInput({
            ...cardInput,
            [e.name]: e.value,
        });
    }

    return (
        <CardsContext.Provider value={{
            cards,
            flags,
            cardInput,
            isNewCardModalOpen,
            handleOpenNewCardModal,
            handleCloseNewCardModal,
            loadCards,
            loadFlags,
            createCard,
            handleChange,
            handleSelect
        }}>
            {children}
        </CardsContext.Provider>
    );
}

export function useCard(): CardsContextData {
    const context = useContext(CardsContext)
    if (!context) {
        throw new Error('useCard must be used within an CardProvider');
    }

    return context;
}
