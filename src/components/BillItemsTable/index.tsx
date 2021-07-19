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

import { formatDate, formatMoney } from '../../utils/formats';
import { BillItem } from '../../models/bills';
import { useBill } from '../../hooks/bill';
import { useBillItem } from '../../hooks/billItem';

interface BillItemsTableProps {
    billId: string;
    billItems: BillItem[]
}

interface ItemsTable {
    id: string;
    value: number;
    titulo: string;
    valor: string;
}

export function BillItemsTable({ billId, billItems }: BillItemsTableProps) {
    const { loadBillById, bill } = useBill();
    const { handleOpenEditBillItemModal } = useBillItem();
    const fields = ['titulo', 'valor']

    const items = billItems.map(item => {
        return {
            id: item.id,
            value: item.value,
            titulo: item.title,
            valor: formatMoney(item.value),
        }
    })

    useEffect(() => {
        loadBillById(billId)
    })

    return (
        <>
            <CRow>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatDate(bill?.date ?? new Date())}
                        text="Data"
                        color="gradient-primary"
                        inverse
                    >
                        <CIcon content={freeSet.cilCalendar} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(bill.fortyPercent)}
                        text="40%"
                        color="gradient-info"
                        inverse
                    >
                        <CIcon content={freeSet.cilMoney} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(bill.sixtyPercent)}
                        text="60%"
                        color="gradient-warning"
                        inverse
                    >
                        <CIcon content={freeSet.cilMoney} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(bill.total)}
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
                                onRowClick={(item: ItemsTable) => {
                                    handleOpenEditBillItemModal(item.id, {
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
