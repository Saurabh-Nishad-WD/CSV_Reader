import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { FirebaseProvider } from './config/firebaseConfig.jsx';
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </BrowserRouter>
  </StrictMode>
);
