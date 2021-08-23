import { ActionType } from "./ActionTypes";


export const setSearchText = (text) => {
    return {
        type: ActionType.SET_SEARCH_TEXT,
        payload: text,
    }
}
