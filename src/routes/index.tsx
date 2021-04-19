import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { Cards } from '../pages/Cards';
import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard';
import { Transactions } from '../pages/Transactions';
import { TransactionItems } from '../pages/TransactionItems';
import { Bills } from '../pages/Bills';
import { BillItems } from '../pages/BillItems';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/transacoes" exact component={Transactions} isPrivate />
            <Route path="/transacoes/:id" exact component={TransactionItems} isPrivate />
            <Route path="/contas" exact component={Bills} isPrivate />
            <Route path="/contas/:id" exact component={BillItems} isPrivate />
            <Route path="/cartoes" exact component={Cards} isPrivate />
        </Switch>
    );
};

export default Routes;
