import React, { ReactNode } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../../store/root-reducer';
import Home from '../Home/Home';

const AppRouter: React.FC = (): JSX.Element => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path='/index.html'
          render={(): ReactNode => {
            return <Redirect to='/1' />;
          }}
        />
        <Route
          exact
          path='/'
          render={(): ReactNode => {
            return <Redirect to='/1' />;
          }}
        />
        <Route
          path='/:page'
          exact
          render={(): ReactNode => {
            return <Home />;
          }}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default AppRouter;
