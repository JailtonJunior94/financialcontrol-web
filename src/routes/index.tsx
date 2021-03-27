import React from 'react';
import { Switch } from 'react-router-dom';

import { Cards } from '../pages/Cards';
import { SignIn } from '../pages/SignIn';
import { Dashboard } from '../pages/Dashboard';
import { Transactions } from '../pages/Transactions';

import Route from './Route';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Route path="/transactions" component={Transactions} isPrivate />
            <Route path="/cards" component={Cards} isPrivate />
        </Switch>
    );
};

export default Routes;
