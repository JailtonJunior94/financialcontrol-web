import { useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CWidgetProgressIcon
} from '@coreui/react';
import { freeSet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import { Item } from './styles';
import { formatMoney, formatDate } from '../../utils/formats';
import { TransactionItem } from '../../models/transactions';
import { useTransaction } from '../../hooks/transaction';
import { useTransactionItem } from '../../hooks/transactionItem';

interface TransactionItemsTableProps {
    transactionId: string;
    transactionsItems: TransactionItem[]
}

interface ItemsTable {
    id: string;
    type: string;
    value: number;
    titulo: string;
    valor: string;
}

export function TransactionItemsTable({ transactionId, transactionsItems }: TransactionItemsTableProps) {
    const { transaction, loadTransactionById } = useTransaction();
    const { handleOpenEditTransactionItemModal } = useTransactionItem();
    const fields = ['titulo', 'valor']

    const items = transactionsItems.map(item => {
        return {
            id: item.id,
            type: item.type,
            value: item.value,
            titulo: item.title,
            valor: formatMoney(item.value),
        }
    })

    useEffect(() => {
        loadTransactionById(transactionId)
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
                                clickableRows
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
                                    )
                                }}
                                onRowClick={(item: ItemsTable) => {
                                    handleOpenEditTransactionItemModal(item.id, {
                                        type: item.type,
                                        title: item.titulo,
                                        value: item.value
                                    });
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}
