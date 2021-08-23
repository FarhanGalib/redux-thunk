import { ActionType } from "../actions/ActionTypes";

const initialState = {
    currentProduct: null,
};

const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.Load_CURRENT_PRODUCT:
            return { ...state, currentProduct: action.payload };
        default:
            return state;
    }
};

export default productDetailsReducer;
