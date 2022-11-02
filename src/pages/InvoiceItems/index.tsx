import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    CCol,
    CRow,
    CWidgetProgressIcon,
    CSpinner
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

import { useCard } from '../../hooks/card';
import { Params } from '../../models/params';
import { Layout } from '../../components/Layout';
import { useInvoice } from '../../hooks/invoices';
import { formatDate, formatMoney } from '../../utils/formats';
import { InvoiceItemsTable } from '../../components/InvoiceItemsTable';
import { Card } from '../../models/cards';

export function InvoiceItems() {
    const { cards } = useCard();
    const { id } = useParams<Params>();
    const [card, setCard] = useState<Card>({} as Card)
    const [isLoading, setIsLoading] = useState(true);
    const { invoice, invoices, loadInvoiceById } = useInvoice();

    useEffect(() => {
        const invoice = async () => await loadInvoiceById(id)
        invoice()
        setIsLoading(false);
        const cardId: string = invoices.find(j => j.id === id)?.cardId ?? '';
        setCard(cards.find(j => j.id === cardId) ?? {} as Card)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <Layout>
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            {!!isLoading &&
                <>
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
                                header={formatMoney(invoice.total)}
                                text="Total da fatura"
                                color="gradient-danger"
                                inverse
                            >
                                <CIcon content={freeSet.cilMoney} />
                            </CWidgetProgressIcon>
                        </CCol>
                        <CCol xs="3" sm="3" lg="3">
                            <CWidgetProgressIcon
                                header={formatDate(invoice.date)}
                                text="Data de Fechamento"
                                color="gradient-info"
                                inverse
                            >
                                <CIcon content={freeSet.cilCalendar} />
                            </CWidgetProgressIcon>
                        </CCol>
                        <CCol xs="3" sm="3" lg="3">
                            <CWidgetProgressIcon
                                header={`Dia para comprar: ${card?.bestDayToBuy}`}
                                text="Melhor dia para compras"
                                color="gradient-success"
                                inverse
                            >
                                <CIcon content={freeSet.cilWallet} />
                            </CWidgetProgressIcon>
                        </CCol>
                    </CRow>
                    <InvoiceItemsTable invoiceItems={invoice.invoiceItems ?? []} />
                </>
            }

        </Layout>
    );
}
