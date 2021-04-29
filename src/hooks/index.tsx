import React from 'react';

import { AuthProvider } from './auth';
import { BillsProvider } from './bill';
import { BillItemProvider } from './billItem';
import { CardsProvider } from './card';
import { InvoicesProvider } from './invoices';
import { ToastProvider } from './toast';
import { TransactionsProvider } from './transaction';
import { TransactionItemProvider } from './transactionItem';

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <TransactionsProvider>
                    <TransactionItemProvider>
                        <BillsProvider>
                            <BillItemProvider>
                                <CardsProvider>
                                    <InvoicesProvider>
                                        {children}
                                    </InvoicesProvider>
                                </CardsProvider>
                            </BillItemProvider>
                        </BillsProvider>
                    </TransactionItemProvider>
                </TransactionsProvider>
            </ToastProvider>
        </AuthProvider>
    );
};

export default AppProvider;
