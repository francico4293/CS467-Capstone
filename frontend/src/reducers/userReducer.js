const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        case 'USER_REQUEST_SUCCESS':
            return action.payload;
        default:
            return state
    }
}

export { userReducer };
