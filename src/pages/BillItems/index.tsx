import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CSpinner, CAlert } from '@coreui/react';

import { Params } from '../../models/params';
import { Layout } from '../../components/Layout';
import { useBillItem } from '../../hooks/billItem';
import { SearchBillItem } from '../../components/SearchBillItem';
import { BillItemsTable } from '../../components/BillItemsTable';
import { NewBillItemModal } from '../../components/NewBillItemModal';

export function BillItems() {
    const { id } = useParams<Params>();
    const [isLoading, setIsLoading] = useState(true);
    const { billItems, loadBillItems } = useBillItem();

    useEffect(() => {
        loadBillItems(id);
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <Layout>
            <SearchBillItem />
            {billItems.length !== 0 && (
                <BillItemsTable billId={id} billItems={billItems} />
            )}
            {billItems.length === 0 && (
                <CAlert color="warning" closeButton>Nenhum item encontrado!</CAlert>
            )}
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            <NewBillItemModal />
        </Layout>
    );
}
