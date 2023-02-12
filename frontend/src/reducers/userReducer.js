const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'UNSET_USER':
            return null;
        case 'USER_REQUEST_SUCCESS':
            return action.payload;
        default:
            return state
    }
}

export { userReducer };
