import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';
import { useHistory } from 'react-router-dom';

import { Invoice } from '../../models/invoices';
import { formatDate, formatMoney } from '../../utils/formats';

interface InvoicesTableProps {
    invoices: Invoice[]
}

interface ItemsTable {
    id: string;
    cardId: string;
    'data do fechamento': string;
    'total%': string;
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
    const history = useHistory();
    const fields = ['data do fechamento', 'total']

    const items = invoices.map(invoice => {
        return {
            id: invoice.id,
            cardId: invoice.cardId,
            'data do fechamento': formatDate(invoice.date),
            'total': formatMoney(invoice.total),
        }
    })

    return (
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            clickableRows
                            hover
                            responsive
                            striped
                            pagination
                            items={items}
                            fields={fields}
                            itemsPerPage={10}
                            onRowClick={(item: ItemsTable) => {
                                history.push(`/faturas/${item.id}`)
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
