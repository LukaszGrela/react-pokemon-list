import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import AppRouter from './AppRouter';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
