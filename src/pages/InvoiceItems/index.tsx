import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    CCol,
    CRow,
    CWidgetProgressIcon,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

import { useCard } from '../../hooks/card';
import { Params } from '../../models/params';
import { Layout } from '../../components/Layout';
import { useInvoice } from '../../hooks/invoices';
import { formatDate, formatMoney } from '../../utils/formats';
import { InvoiceItemsTable } from '../../components/InvoiceItemsTable';

export function InvoiceItems() {
    const { cards } = useCard();
    const { id } = useParams<Params>();
    const [cardId, setCardId] = useState('')
    const { invoices, invoiceItems, loadInvoiceItems } = useInvoice();

    useEffect(() => {
        const cardId: string = invoices.find(j => j.id === id)?.cardId ?? '';
        setCardId(cardId);
        loadInvoiceItems(cardId, id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const card = cards.find(j => j.id === cardId);
    const sumTags = invoiceItems
        .filter(j => j.tags === 'Stefany')
        .reduce((a, i) => a + i.installmentValue, 0)

    return (
        <Layout>
            <CRow>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={card?.name}
                        text={card?.description}
                        color="gradient-primary"
                        inverse
                    >
                        <CIcon content={freeSet.cilCreditCard} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(invoices.find(x => x.id === id)?.total ?? 0)}
                        text="Total da fatura"
                        color="gradient-danger"
                        inverse
                    >
                        <CIcon content={freeSet.cilMoney} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatDate(invoices.find(x => x.id === id)?.date ?? new Date())}
                        text="Data de Fechamento"
                        color="gradient-info"
                        inverse
                    >
                        <CIcon content={freeSet.cilCalendar} />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol xs="3" sm="3" lg="3">
                    <CWidgetProgressIcon
                        header={formatMoney(sumTags)}
                        text="Total em Tags (Stefany)"
                        color="gradient-success"
                        inverse
                    >
                        <CIcon content={freeSet.cilWallet} />
                    </CWidgetProgressIcon>
                </CCol>
            </CRow>
            <InvoiceItemsTable invoiceItems={invoiceItems} />
        </Layout>
    );
}
