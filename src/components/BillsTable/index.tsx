import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';
import { useHistory } from 'react-router';

import { Bill } from '../../models/bills';
import { formatDate, formatMoney } from '../../utils/formats';

interface ItemsTable {
    id: string;
    data: string;
    '40%': string;
    '60%': string;
    total: string;
}

interface BillsTableProps {
    bills: Bill[]
}

export function BillsTable({ bills }: BillsTableProps) {
    const history = useHistory();
    const fields = ['data', '40%', '60%', 'total']

    const items = bills.map(bill => {
        return {
            id: bill.id,
            data: formatDate(bill.date),
            '40%': formatMoney(bill.fortyPercent),
            '60%': formatMoney(bill.sixtyPercent),
            total: formatMoney(bill.total)
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
                            itemsPerPage={12}
                            onRowClick={(item: ItemsTable) => {
                                history.push(`/contas/${item.id}`)
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
