import React from 'react';

import { AuthProvider } from './auth';
import { TransactionsProvider } from './transaction';

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <TransactionsProvider>
                {children}
            </TransactionsProvider>
        </AuthProvider>
    );
};

export default AppProvider;
