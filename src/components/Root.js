import React from 'react';
import { Provider } from 'react-redux';
import AppLayout from './AppLayout';
import configureStore from '../configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/main.scss';

const App = () => {
    return (
        <Provider store={configureStore()}>
            <AppLayout />
        </Provider>
    );
};

export default App;