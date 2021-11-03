import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CSpinner, CAlert } from '@coreui/react';

import { Params } from '../../models/params';
import { Layout } from '../../components/Layout';
import { useTransaction } from '../../hooks/transaction';
import { TransactionItemsTable } from '../../components/TransactionItemsTable';
import { SearchTransactionItem } from '../../components/SearchTransactionItem';
import { NewTransactionItemModal } from '../../components/NewTransactionItemModal';

export function TransactionItems() {
    const { id } = useParams<Params>();
    const [isLoading, setIsLoading] = useState(true);
    const { transaction, transactionItems, loadTransactionById } = useTransaction();

    useEffect(() => {
        loadTransactionById(id)
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <SearchTransactionItem />
            {transactionItems.length !== 0 && (
                <TransactionItemsTable transaction={transaction} transactionsItems={transactionItems} />
            )}
            {transactionItems.length === 0 && (
                <CAlert color="warning" closeButton>Nenhum item encontrado!</CAlert>
            )}
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            <NewTransactionItemModal />
        </Layout>
    );
}
