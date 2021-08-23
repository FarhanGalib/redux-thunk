import axios from "axios";
import { ActionType } from "./ActionTypes";
import { useHistory } from "react-router";

export const loadCurrentProduct = (currentProduct) => {
    return {
        type: ActionType.Load_CURRENT_PRODUCT,
        payload: currentProduct,
    };
};

export const requestCurrentProduct = (id) => {
    return async (dispatch) => {
        const { data } = await axios.get(
            `https://fakestoreapi.com/products/${id}`
        );
        dispatch(loadCurrentProduct(data));
    };
};

export const requestUpdate = (updatableProduct, id) => {
    return async (dispatch) => {
        axios.patch(
            `https://fakestoreapi.com/products/${id}`,
            updatableProduct
        );
    };
};

export const requestDelete = (id) => {
    return async (dispatch) => {
        axios.delete(`https://fakestoreapi.com/products/${id}`);
    };
};
