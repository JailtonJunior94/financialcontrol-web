import { useEffect, useState } from 'react';
import { CSpinner, CAlert } from '@coreui/react'

import { api } from '../../services/api';
import { Layout } from '../../components/Layout';
import { SearchTransactions } from '../../components/SearchTransactions';
import { TransactionsTable } from '../../components/TransactionsTable';
import { Transaction } from '../../models/transactions';

export function Transactions() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get<Transaction[]>('api/v1/transactions')
            .then(response => {
                setTransactions(response.data);
                setIsLoading(false);
            });
    }, [])

    return (
        <Layout>
            <SearchTransactions />
            {transactions.length !== 0 && (
                <TransactionsTable transactions={transactions} />
            )}
            {transactions.length === 0 && (
                <CAlert color="warning" closeButton>Nenhum item encontrado!</CAlert>
            )}
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
        </Layout>
    );
}
