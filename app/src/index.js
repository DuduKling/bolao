import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={Store}>
    <BrowserRouter>
        <Route path='/' component={App} />
        {/* <App />*/}
    </BrowserRouter>
</Provider>
, document.getElementById('root'));

registerServiceWorker();
