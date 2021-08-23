import axios from "axios";
import { ActionType } from "./ActionTypes";

export const loadProduct=(products) => {
    return{
        type: ActionType.LOAD_PRODUCT_TO_PRODUCT_LIST,
        payload: products,
    }
}

export const requestProductList = () => {
    return async (dispatch) => {
        const {data} = await axios.get(" https://fakestoreapi.com/products");
        dispatch(loadProduct(data));
    }
}


