const proficiencyReducer = (state = { skill: '', percentage: 0 }, action) => {
    switch (action.type) {
        case 'EDIT_PROFICIENCY':
            return action.payload;
        default:
            return state;
    }
}

export { proficiencyReducer };
