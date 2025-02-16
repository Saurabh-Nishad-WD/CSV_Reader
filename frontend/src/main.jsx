import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { FirebaseProvider } from './config/firebaseConfig.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </HashRouter>
  </StrictMode>
);
