import { Layout } from '../../components/Layout';
import { SearchTransactions } from '../../components/SearchTransactions';
import { TransactionsTable } from '../../components/TransactionsTable';

export function Transactions() {
    return (
        <Layout>
            <SearchTransactions />
            <TransactionsTable />
        </Layout>
    );
}