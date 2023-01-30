const themeReducer = (state = 'light', action) => {
    switch (action.type) {
        case 'THEME_CHANGE_REQUEST':
            return action.payload;
        default:
            return state;
    }
}

export { themeReducer };
