import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';

import { formatDate, formatMoney } from '../../utils/formats';
import { InvoiceItem } from '../../models/invoices';

interface InvoiceItemsTableProps {
    invoiceItems: InvoiceItem[]
}

export function InvoiceItemsTable({ invoiceItems }: InvoiceItemsTableProps) {
    const fields = [
        'data da compra',
        'descrição',
        'total',
        'parcela',
        'valor da parcela',
        'tags',
        'categoria'
    ]

    const items = invoiceItems.map(item => {
        return {
            id: item.id,
            invoiceControl: item.invoiceControl,
            'data da compra': formatDate(item.purchaseDate),
            'descrição': item.description,
            'total': formatMoney(item.totalAmount),
            'parcela': item.installment,
            'valor da parcela': formatMoney(item.installmentValue),
            'tags': item.tags,
            'categoria': item.category.name,
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
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
