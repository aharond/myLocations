import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {loggerMiddleware} from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getMiddlewares = () => {
    if (process.env.NODE_ENV === 'development') {
        return [thunkMiddleware, loggerMiddleware];
    }
    return thunkMiddleware;
};

class Store {
    create (initialState) {
        return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...getMiddlewares())));
    }
}

export default (initialState) => {
    const configureStore = new Store();
    const store = configureStore.create(initialState);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};
