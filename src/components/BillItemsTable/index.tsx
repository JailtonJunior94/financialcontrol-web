import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';

import { formatMoney } from '../../utils/formats';
import { BillItem } from '../../models/bills';
import { useBillItem } from '../../hooks/billItem';

interface BillItemsTableProps {
    billItems: BillItem[]
}

interface ItemsTable {
    id: string;
    value: number;
    titulo: string;
    valor: string;
}

export function BillItemsTable({ billItems }: BillItemsTableProps) {
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
    );
}
