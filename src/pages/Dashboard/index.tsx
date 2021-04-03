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
import { Transaction } from '../../models/transactions';
import { formatDateA, formatMoney } from '../../utils/formats';

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const labels = transactions.map(j => formatDateA(j.date));

    async function loadTransactions() {
        const response = await api.get<Transaction[]>('api/v1/transactions');
        setTransactions(response.data);
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
                            labels={labels}
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
                            labels={labels}
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
