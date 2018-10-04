import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';

import store from './Redux/store';
import './index.css';
import ScrollRestoration from './Components/ScrollRestoration/ScrollRestoration';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollRestoration>
                <App />
            </ScrollRestoration>
        </Router>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
