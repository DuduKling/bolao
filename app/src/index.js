import './index.css';

import React from 'react';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';

import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
);

registerServiceWorker();
