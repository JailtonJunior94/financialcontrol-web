import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { TransactionsProvider } from './transaction';

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <TransactionsProvider>
                    {children}
                </TransactionsProvider>
            </ToastProvider>
        </AuthProvider>
    );
};

export default AppProvider;
