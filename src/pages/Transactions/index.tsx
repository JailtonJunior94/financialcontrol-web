import { useEffect, useState } from 'react';
import { CSpinner, CAlert } from '@coreui/react';

import { Layout } from '../../components/Layout';
import { SearchTransactions } from '../../components/SearchTransactions';
import { TransactionsTable } from '../../components/TransactionsTable';
import { NewTransactionModal } from '../../components/NewTransactionModal';
import { useTransaction } from '../../hooks/transaction';

export function Transactions() {
    const [isLoading, setIsLoading] = useState(true);
    const { transactions, loadTransactions } = useTransaction();

    useEffect(() => {
        loadTransactions();
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <NewTransactionModal />
        </Layout>
    );
}
