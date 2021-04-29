import { Cards } from '../pages/Cards';
import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions';
import { TransactionItems } from '../pages/TransactionItems';
import { Bills } from '../pages/Bills';
import { BillItems } from '../pages/BillItems';
import { Invoice } from '../pages/Invoices';
import { InvoiceItems } from '../pages/InvoiceItems';

const routes = [
    { path: '/', exact: true, name: 'SignIn', component: SignIn },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/transacoes', name: 'Transactions', component: Transactions },
    { path: '/transacoes/:id', name: 'TransactionItems', component: TransactionItems },
    { path: '/contas', name: 'Bills', component: Bills },
    { path: '/contas/:id', name: 'BillItems', component: BillItems },
    { path: '/cartoes', name: 'Cards', component: Cards },
    { path: '/faturas', name: 'Invoice', component: Invoice },
    { path: '/faturas/:id', name: 'InvoiceItems', component: InvoiceItems },
]

export default routes;
