import { useEffect, useState } from 'react';
import { CChartBar, CChartDoughnut, CChartLine } from '@coreui/react-chartjs';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardGroup,
    CSpinner,
    CRow,
} from '@coreui/react';

import { api } from '../../services/api';
import { Layout } from '../../components/Layout';
import { Bill } from '../../models/bills';
import { Transaction } from '../../models/transactions';
import { formatDateA, formatMoney, monthName } from '../../utils/formats';
import { InvoiceCategories } from '../../models/invoicesCategories';
import { Card } from '../../models/cards';
import { Invoice } from '../../models/invoices';

export function Dashboard() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [invoices, setInvoice] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [monthFullName, setmonthFullName] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [invoiceCategories, setInvoiceCategories] = useState<InvoiceCategories[]>([])

    const labelBills = bills.map(j => formatDateA(j.date));
    const labelInvoices = invoices.map(j => formatDateA(j.date));
    const labelTransactions = transactions.map(j => formatDateA(j.date));

    async function load() {
        const [transactions, bills, cards] = await Promise.all([
            api.get<Transaction[]>('api/v1/transactions'),
            api.get<Bill[]>('api/v1/bills'),
            api.get<Card[]>('api/v1/cards')
        ])

        const now = new Date();
        const month = new Date(now.setMonth(now.getMonth() + 1));
        setmonthFullName(monthName(month));

        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);

        const transactionsFilter = transactions.data.filter((t: Transaction) => {
            return new Date(t.date).getTime() >= start.getTime() &&
                new Date(t.date).getTime() <= end.getTime();
        });
        setTransactions(transactionsFilter);

        const billsFilter = bills.data.filter((b: Bill) => {
            return new Date(b.date).getTime() >= start.getTime() &&
                new Date(b.date).getTime() <= end.getTime();
        });
        setBills(billsFilter);

        const invoiceCategories = await api.get<InvoiceCategories[]>(`api/v1/cards/${cards.data[1].id}/categories?start=${month.toISOString()}&end=${month.toISOString()}`);
        const invoices = await api.get<Invoice[]>(`api/v1/cards/${cards.data[1].id}/invoices`)

        setInvoiceCategories(invoiceCategories.data)
        setInvoice(invoices.data);
        setIsLoading(false);
    }

    useEffect(() => {
        load();
        return () => {
            setTransactions([]);
            setIsLoading(false);
        }
    }, [])

    return (
        <Layout>
            {isLoading &&
                <CSpinner
                    color="primary"
                    style={{ width: '7rem', height: '7rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                />
            }
            {transactions.length !== 0 && (
                <>
                    <CRow>
                        <CCardGroup columns className="cols-2" >
                            <CCard>
                                <CCardHeader>Transações Mensais</CCardHeader>
                                <CCardBody>
                                    <CChartBar
                                        datasets={[
                                            {
                                                label: 'Total',
                                                backgroundColor: '#363f5f',
                                                data: transactions.map(t => t.total)
                                            },
                                            {
                                                label: 'Entradas',
                                                backgroundColor: '#33CC95',
                                                data: transactions.map(t => t.income)
                                            },
                                            {
                                                label: 'Saídas',
                                                backgroundColor: '#e52e4d',
                                                data: transactions.map(t => t.outcome)
                                            }
                                        ]}
                                        labels={labelTransactions}
                                        options={{
                                            tooltips: {
                                                enabled: true,
                                                callbacks: {
                                                    label: (t: any) => formatMoney(t.yLabel)
                                                },
                                            }
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                            <CCard>
                                <CCardHeader>Cartão Nubank</CCardHeader>
                                <CCardBody>
                                    <CChartLine
                                        labels={labelInvoices}
                                        datasets={[
                                            {
                                                label: 'Faturas (Valor)',
                                                data: invoices.map(j => j.total),
                                            },
                                        ]}
                                        options={{
                                            tooltips: {
                                                enabled: true,
                                                callbacks: {
                                                    label: (t: any) => formatMoney(t.yLabel)
                                                },
                                            }
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CRow>
                    <CRow>
                        <CCardGroup columns className="cols-2" >
                            <CCard>
                                <CCardHeader>Gastos por categoria mês: <strong>({monthFullName})</strong></CCardHeader>
                                <CCardBody>
                                    <CChartDoughnut
                                        labels={invoiceCategories.map(j => j.name)}
                                        datasets={[
                                            {
                                                backgroundColor: [
                                                    '#FF5733',
                                                    '#FFCD33',
                                                    '#A0FF33',
                                                    '#33FF3B',
                                                    '#33FFCC',
                                                    '#33BDFF',
                                                    '#3341FF',
                                                    '#A333FF',
                                                    '#FF33FB',
                                                    '#FF6384',
                                                    '#FF33A2',
                                                    '#FF3371',
                                                    '#FF3333',
                                                    '#36A2EB',
                                                    '#FFCE56',
                                                ],
                                                data: invoiceCategories.map(j => j.total),
                                            },
                                        ]}
                                        options={{
                                            tooltips: {
                                                enabled: true,
                                                callbacks: {
                                                    label: (tooltipItem: any, data: any) => {
                                                        const label = data.labels[tooltipItem['index']];
                                                        const value = formatMoney(data['datasets'][0]['data'][tooltipItem['index']]);
                                                        return ` ${label}: ${value}`;
                                                    }
                                                },
                                            }
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                            <CCard>
                                <CCardHeader>Contas da Casa</CCardHeader>
                                <CCardBody>
                                    <CChartBar
                                        datasets={[
                                            {
                                                label: 'Total',
                                                backgroundColor: '#A9A9A9',
                                                data: bills.map(b => b.total)
                                            },
                                            {
                                                label: '60 %',
                                                backgroundColor: '#0000FF',
                                                data: bills.map(b => b.sixtyPercent)
                                            },
                                            {
                                                label: '40 %',
                                                backgroundColor: '#00FFFF',
                                                data: bills.map(b => b.fortyPercent)
                                            }
                                        ]}
                                        labels={labelBills}
                                        options={{
                                            tooltips: {
                                                enabled: true,
                                                callbacks: {
                                                    label: (t: any) => formatMoney(t.yLabel)
                                                },
                                            }
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CRow>
                </>
            )}
        </Layout>
    );
}
