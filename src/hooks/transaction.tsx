import { ReactNode, createContext, useContext } from 'react';

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {

}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    return (
        <TransactionsContext.Provider value={{}}>
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
