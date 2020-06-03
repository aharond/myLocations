import {createLogger} from 'redux-logger';
import _ from 'lodash';

export default createLogger({
    stateTransformer: (state) => {
        return _.reduce(_.keys(state), (res, stateKey) => {
            res[stateKey] = state[stateKey];
            return res;
        }, {});
    }
});