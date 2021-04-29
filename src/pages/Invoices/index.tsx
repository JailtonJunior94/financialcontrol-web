import { useEffect } from 'react';
import { CSpinner } from '@coreui/react';

import { useCard } from '../../hooks/card';
import { useInvoice } from '../../hooks/invoices';
import { Layout } from '../../components/Layout';
import { SearchInvoices } from '../../components/SearchInvoices';
import { InvoicesTable } from '../../components/InvoicesTable';
import { NewInvoiceModal } from '../../components/NewInvoiceModal';

export function Invoice() {
    const { loadCards } = useCard();
    const { invoices, isLoading, loadCategories } = useInvoice()

    useEffect(() => {
        loadCards();
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <SearchInvoices />
            {invoices.length !== 0 && (
                <InvoicesTable invoices={invoices} />
            )}
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            <NewInvoiceModal />
        </Layout>
    );
}
