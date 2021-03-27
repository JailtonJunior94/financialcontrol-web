import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions';
import { Cards } from '../pages/Cards';

const routes = [
    { path: '/', exact: true, name: 'SignIn', component: SignIn },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/transactions', name: 'Transactions', component: Transactions },
    { path: '/cards', name: 'Cards', component: Cards },
]

export default routes;