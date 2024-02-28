import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import holderReducer from './Holder';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(holderReducer, composedEnhancer);
export default store;
