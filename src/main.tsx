import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('[main] Root element #root not found. Check index.html.');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
 
















