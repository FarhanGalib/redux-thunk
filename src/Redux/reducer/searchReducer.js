import { ActionType } from "../actions/ActionTypes";
const initialState = {
    searchText: "",
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_SEARCH_TEXT:
            return { ...state, searchText: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
