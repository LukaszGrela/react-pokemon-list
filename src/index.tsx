import { createRoot } from 'react-dom/client';
import React from 'react';
import reportWebVitals from './reportWebVitals';

// import * as serviceWorker from './serviceWorker';
import App from './components/App/App';

import './styles/index.scss';

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // eslint-disable-next-line no-console
  console.error("There is no container 'root' available.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
