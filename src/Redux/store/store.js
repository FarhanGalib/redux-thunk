import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer,composeEnhancer);
export default store;