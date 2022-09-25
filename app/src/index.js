import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Store } from './store';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Route path='/' component={App} />
            {/*<App />*/}
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root')
);
registerServiceWorker();
