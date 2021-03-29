import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';
import { useHistory } from 'react-router';

import { Transaction } from '../../models/transactions';
import { formatDate, formatMoney } from '../../utils/formats';

interface ItemsTable {
    id: string;
    data: string;
    entrada: string;
    saida: string;
    total: string;
}

interface TransactionsTableProps {
    transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
    const history = useHistory();
    const fields = ['data', 'entrada', 'saida', 'total']

    const items = transactions.map(transaction => {
        return {
            id: transaction.id,
            data: formatDate(transaction.date),
            entrada: formatMoney(transaction.income),
            saida: formatMoney(transaction.outcome),
            total: formatMoney(transaction.total),
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
                                history.push(`/transacoes/${item.id}`)
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
