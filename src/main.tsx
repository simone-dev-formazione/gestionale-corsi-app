import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { DatabaseContextProvider } from './components/DatabaseContextProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <DatabaseContextProvider>
    <App />
  </DatabaseContextProvider>
  // </React.StrictMode>
);