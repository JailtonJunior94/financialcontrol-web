import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { Cards } from '../pages/Cards';
import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard';
import { Transactions } from '../pages/Transactions';
import { TransactionItems } from '../pages/TransactionItems';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/transactions" exact component={Transactions} isPrivate />
            <Route path="/transactions/:id" exact component={TransactionItems} isPrivate />
            <Route path="/cards" exact component={Cards} isPrivate />
        </Switch>
    );
};

export default Routes;
