import { combineReducers } from "redux";
import productListReducer from './productListReducer';
import productDetailsReducer from './productDetailsReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    productListReducer,
    productDetailsReducer,
    searchReducer,
    
});

export default  rootReducer;