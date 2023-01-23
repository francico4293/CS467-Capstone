import { 
    LIGHT_MODE, 
    DARK_MODE 
} from '../constants/themeConstants';

export const themeReducer = (state = { type: 'light' }, action) => {
    switch (action.type) {
        case LIGHT_MODE:
            return { type: action.payload };
        case DARK_MODE:
            return { type: action.payload };
        default:
            return state;
    }
}
