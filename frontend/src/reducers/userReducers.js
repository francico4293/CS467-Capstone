import { 
    USER_REQUEST, 
    USER_REQUEST_SUCCESS, 
    USER_REQUEST_FAILURE 
} from "../constants/userConstants";

const userReducer = (state = { isLoading: false, isLoggedIn: false }, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return { isLoading: true, isLoggedIn: state.isLoggedIn };
        case USER_REQUEST_SUCCESS:
            return { isLoading: false, ...action.payload };
        case USER_REQUEST_FAILURE:
            return { isLoading: false, isLoggedIn: state.isLoggedIn };
        default:
            return state; 
    }
}

export { userReducer };
