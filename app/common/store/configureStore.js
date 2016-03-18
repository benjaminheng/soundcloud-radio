import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import config from '../../../config';
import rootReducer from '../reducers';

let middleware = [thunk];

if (!config.isProduction) {
    const logger = require('./loggerMiddleware').default;
    middleware = [...middleware, logger];
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer, 
        initialState,
        applyMiddleware(...middleware)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
