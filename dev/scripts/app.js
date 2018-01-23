import React from 'react';
import ReactDOM from 'react-dom';

import store from './store'
import { Provider } from 'react-redux';

import MainApp from './components/main-app'

ReactDOM.render(
    <Provider store={store}>
        <MainApp />
    </Provider>,
    document.getElementById('root')
);