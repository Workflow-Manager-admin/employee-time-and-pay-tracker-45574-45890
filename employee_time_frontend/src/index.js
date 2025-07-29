import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Main entry point that renders the app.
// BrowserRouter is now included inside App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
