import { useEffect, useState } from 'react';
import { CSpinner, CAlert } from '@coreui/react';

import { Layout } from '../../components/Layout';
import { SearchBill } from '../../components/SearchBill';
import { BillsTable } from '../../components/BillsTable';
import { NewBillModal } from '../../components/NewBillModal';
import { useBill } from '../../hooks/bill';

export function Bills() {
    const [isLoading, setIsLoading] = useState(true);
    const { bills, loadBills } = useBill();

    useEffect(() => {
        loadBills();
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <SearchBill />
            {bills.length !== 0 && (
                <BillsTable bills={bills} />
            )}
            {bills.length === 0 && (
                <CAlert color="warning" closeButton>Nenhum item encontrado!</CAlert>
            )}
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            <NewBillModal />
        </Layout>
    );
}
