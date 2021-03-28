import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'

import { formatMoney } from '../../utils/formats';
import { Item } from './styles';

interface TransactionItem {
    id: string;
    title: string;
    value: number;
    type: string;
    active: boolean;
}

interface TransactionItemsTableProps {
    transactionsItems: TransactionItem[]
}

export function TransactionItemsTable({ transactionsItems }: TransactionItemsTableProps) {
    const fields = ['titulo', 'valor']

    const items = transactionsItems.map(item => {
        return {
            id: item.id,
            type: item.type,
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
                            scopedSlots={{
                                'valor': (item: any) => (
                                    <Item className={item.type}>
                                        {item.type === "OUTCOME" ? '-' : ''} {item.valor}
                                    </Item>
                                )
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
