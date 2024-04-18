import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './hooks/CommonContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <DataProvider>
            <App />
        </DataProvider>
    </Router>
);
