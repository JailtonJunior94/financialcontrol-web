import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CSpinner, CAlert } from '@coreui/react'

import { Layout } from '../../components/Layout';
import { TransactionItemsTable } from '../../components/TransactionItemsTable';
import { SearchTransactionItem } from '../../components/SearchTransactionItem';
import { NewTransactionItemModal } from '../../components/NewTransactionItemModal';
import { Params } from '../../models/params';
import { useTransaction } from '../../hooks/transaction';

export function TransactionItems() {
    const { id } = useParams<Params>();
    const [isLoading, setIsLoading] = useState(true);
    const { transactionItems, loadTransactionItems } = useTransaction();

    useEffect(() => {
        loadTransactionItems(id);
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <Layout>
            <SearchTransactionItem />
            {transactionItems.length !== 0 && (
                <TransactionItemsTable transactionsItems={transactionItems} />
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
