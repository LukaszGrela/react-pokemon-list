import React from 'react';
import { HistoryRouter as ConnectedRouter } from 'redux-first-history/rr6';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import { history } from '../../store';

const AppRouter: React.FC = (): JSX.Element => {
  return (
    <ConnectedRouter history={history}>
      <Routes>
        <Route path="/index.html" element={<Navigate replace to="/1" />} />
        <Route path="/" element={<Navigate replace to="/1" />} />
        <Route path="/:page" element={<Home />} />
      </Routes>
    </ConnectedRouter>
  );
};

export default AppRouter;
