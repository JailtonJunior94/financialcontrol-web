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
import { InvoiceItems } from '../pages/InvoiceItems';
import { Invoice } from '../pages/Invoices';

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
            <Route path="/faturas" exact component={Invoice} isPrivate />
            <Route path="/faturas/:id" exact component={InvoiceItems} isPrivate />
        </Switch>
    );
};

export default Routes;
