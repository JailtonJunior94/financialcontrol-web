import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'
import { useHistory } from 'react-router';

import { useTransaction } from '../../hooks/transaction';
import { formatDate, formatMoney } from '../../utils/formats';

export function TransactionsTable() {
    const history = useHistory();

    const { transactions } = useTransaction();
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
                            onRowClick={(item: any) => {
                                history.push(`/transactions/${item.id}`)
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
