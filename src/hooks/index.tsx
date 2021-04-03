import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { TransactionsProvider } from './transaction';
import { TransactionItemProvider } from './transactionItem';

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <TransactionsProvider>
                    <TransactionItemProvider>
                        {children}
                    </TransactionItemProvider>
                </TransactionsProvider>
            </ToastProvider>
        </AuthProvider>
    );
};

export default AppProvider;
