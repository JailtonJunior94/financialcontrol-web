import { useEffect, useState } from 'react';
import { CChartBar } from '@coreui/react-chartjs';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardGroup,
    CSpinner
} from '@coreui/react';

import { api } from '../../services/api';
import { Layout } from '../../components/Layout';
import { Bill } from '../../models/bills';
import { Transaction } from '../../models/transactions';
import { formatDateA, formatMoney } from '../../utils/formats';

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [bills, setBills] = useState<Bill[]>([])
    const labelTransactions = transactions.map(j => formatDateA(j.date));
    const labelBills = bills.map(j => formatDateA(j.date));

    async function loadTransactions() {
        const [transactions, bills] = await Promise.all([
            api.get<Transaction[]>('api/v1/transactions'),
            api.get<Bill[]>('api/v1/bills'),
        ])

        setTransactions(transactions.data);
        setBills(bills.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
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
            {transactions.length !== 0 && (<CCardGroup columns className="cols-2" >
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
            )}
        </Layout>
    );
}
