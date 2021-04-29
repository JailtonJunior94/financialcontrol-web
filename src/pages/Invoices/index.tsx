import { useEffect } from 'react';
import { CSpinner } from '@coreui/react';

import { useCard } from '../../hooks/card';
import { useInvoice } from '../../hooks/invoices';
import { Layout } from '../../components/Layout';
import { SearchInvoices } from '../../components/SearchInvoices';
import { InvoicesTable } from '../../components/InvoicesTable';

export function Invoice() {
    const { loadCards } = useCard();
    const { invoices, isLoading } = useInvoice()

    useEffect(() => {
        loadCards();
        // loadFlags();
        // setIsLoading(false);
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
        </Layout>
    );
}
