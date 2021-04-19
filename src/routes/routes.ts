import { Cards } from '../pages/Cards';
import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions';
import { TransactionItems } from '../pages/TransactionItems';
import { Bills } from '../pages/Bills';
import { BillItems } from '../pages/BillItems';

const routes = [
    { path: '/', exact: true, name: 'SignIn', component: SignIn },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/transacoes', name: 'Transactions', component: Transactions },
    { path: '/transacoes/:id', name: 'TransactionItems', component: TransactionItems },
    { path: '/contas', name: 'Bills', component: Bills },
    { path: '/contas/:id', name: 'BillItems', component: BillItems },
    { path: '/cartoes', name: 'Cards', component: Cards },
]

export default routes;
