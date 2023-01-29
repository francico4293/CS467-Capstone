import { THEME_CHANGE_REQUEST } from '../constants/themeConstants';

export const themeReducer = (state = { type: 'light' }, action) => {
    switch (action.type) {
        case THEME_CHANGE_REQUEST:
            return { type: action.payload };
        default:
            return state;
    }
}
