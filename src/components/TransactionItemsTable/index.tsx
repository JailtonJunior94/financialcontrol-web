import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CWidgetProgressIcon,
    CSwitch,
    CButton
} from '@coreui/react';
import { freeSet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import { Item } from './styles';
import { formatMoney, formatDate } from '../../utils/formats';
import { useTransactionItem } from '../../hooks/transactionItem';
import { Transaction, TransactionItem } from '../../models/transactions';
import { useTransaction } from '../../hooks/transaction';

interface TransactionItemsTableProps {
    transaction: Transaction;
    transactionsItems: TransactionItem[]
}

interface ItemsTable {
    id: string;
    type: string;
    value: number;
    titulo: string;
    valor: string;
    isPaid: boolean;
}

export function TransactionItemsTable({ transaction, transactionsItems }: TransactionItemsTableProps) {
    const { removeTransactionItem, markAsPaidTransactionItem } = useTransaction();
    const { handleOpenEditTransactionItemModal } = useTransactionItem();
    const fields = ['titulo', 'valor', 'editar', 'deletar', 'pago?']

    const items = transactionsItems.map(item => {
        return {
            id: item.id,
            type: item.type,
            value: item.value,
            titulo: item.title,
            isPaid: item.isPaid,
            valor: formatMoney(item.value),
        }
    })

    return (
        <>
            <CRow>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatDate(transaction?.date ?? new Date())}
                        text="Data"
                        color="gradient-primary"
                        inverse
                    >
                        <CIcon content={freeSet.cilCalendar} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(transaction.income)}
                        text="Entrada"
                        color="gradient-info"
                        inverse
                    >
                        <CIcon content={freeSet.cilMoney} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(transaction.outcome)}
                        text="Saída"
                        color="gradient-danger"
                        inverse
                    >
                        <CIcon content={freeSet.cilMoney} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(transaction.total)}
                        text="Total"
                        color="gradient-success"
                        inverse
                    >
                        <CIcon content={freeSet.cilMoney} />
                    </CWidgetProgressIcon>
                </CCol>
            </CRow>
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
                                itemsPerPage={10}
                                scopedSlots={{
                                    'valor': (item: ItemsTable) => (
                                        <Item className={item.type}>
                                            {item.type === "OUTCOME" ? '-' : ''} {item.valor}
                                        </Item>
                                    ),
                                    'editar': (item: ItemsTable) => (
                                        <td className="py-2">
                                            <CButton
                                                onClick={() => handleOpenEditTransactionItemModal(item.id, {
                                                    type: item.type,
                                                    title: item.titulo,
                                                    value: item.value,
                                                })}
                                                className='btn btn-ghost-dark'
                                                type='button'
                                                block><i className='fa fa-edit'></i>
                                            </CButton>
                                        </td>
                                    ),
                                    'deletar': (item: ItemsTable) => (
                                        <td className="py-2">
                                            <CButton
                                                onClick={() => removeTransactionItem(transaction.id, item.id)}
                                                className='btn btn-ghost-danger'
                                                type='button'
                                                block><i className='fa fa-trash'></i>
                                            </CButton>
                                        </td>
                                    ),
                                    'pago?': (item: ItemsTable) => (
                                        <td className="py-2">
                                            <CSwitch
                                                color={'success'}
                                                checked={item.isPaid}
                                                onClick={() => { markAsPaidTransactionItem(transaction.id, item.id, !item.isPaid) }}
                                            />
                                        </td>
                                    ),
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}
