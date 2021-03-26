import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard'
import { Transactions } from '../pages/Transactions';

const routes = [
    { path: '/', exact: true, name: 'SignIn', component: SignIn },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/transactions', name: 'Transactions', component: Transactions },
]

export default routes;