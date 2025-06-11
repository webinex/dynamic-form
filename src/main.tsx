import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './localization';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
