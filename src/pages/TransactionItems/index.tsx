import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CSpinner, CAlert } from '@coreui/react'

import { api } from '../../services/api';

import { Layout } from '../../components/Layout';
import { TransactionItemsTable } from '../../components/TransactionItemsTable';
import { SearchTransactionItem } from '../../components/SearchTransactionItem';

interface Params {
    id: string;
}

interface Transaction {
    id: string;
    date: Date;
    total: number;
    income: number;
    outcome: number;
    active: boolean;
    items: TransactionItem[]
}

interface TransactionItem {
    id: string;
    title: string;
    value: number;
    type: string;
    active: boolean;
}

export function TransactionItems() {
    const { id } = useParams<Params>();
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionItem[]>([]);

    useEffect(() => {
        api.get<Transaction>(`api/v1/transactions/${id}`)
            .then(response => {
                setTransactions(response.data.items ?? []);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <Layout>
            <SearchTransactionItem />
            {transactions.length !== 0 && (
                <TransactionItemsTable transactionsItems={transactions} />
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
