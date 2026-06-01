import { createRoot } from 'react-dom/client';
import React from 'react';

import './styles/index.scss';
import App from './components/App/App';

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("There is no container 'root' available.");
}
