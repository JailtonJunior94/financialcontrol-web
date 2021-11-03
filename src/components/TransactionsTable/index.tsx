import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton
} from '@coreui/react';
import { useHistory } from 'react-router';

import { useTransaction } from '../../hooks/transaction';
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
    const { cloneTransaction } = useTransaction();
    const fields = ['data', 'entrada', 'saida', 'total', 'detalhes', 'clone']

    const items = transactions.map(transaction => {
        return {
            id: transaction.id,
            data: formatDate(transaction.date),
            entrada: formatMoney(transaction.income),
            saida: formatMoney(transaction.outcome),
            total: formatMoney(transaction.total),
            detalhe: transaction.id,
            clone: transaction.id
        }
    })

    return (
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            hover
                            responsive
                            striped
                            pagination
                            items={items}
                            fields={fields}
                            itemsPerPage={12}
                            scopedSlots={{
                                'detalhes': (item: ItemsTable) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                onClick={() => history.push(`/transacoes/${item.id}`)}
                                                className='btn btn-ghost-success'
                                                type='button'
                                                block><i className='fa fa-bars'></i>
                                            </CButton>
                                        </td>
                                    )
                                },
                                'clone': (item: ItemsTable) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                onClick={() => cloneTransaction(item.id)}
                                                className='btn btn-ghost-dark'
                                                type='button'
                                                block><i className='fa fa-clone'></i>
                                            </CButton>
                                        </td>
                                    )
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
