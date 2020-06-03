import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer'

const allReducers = combineReducers({
    categoryReducer
});

const rootReducer = (state, action) => {
    return allReducers(state, action);
};

export default rootReducer;