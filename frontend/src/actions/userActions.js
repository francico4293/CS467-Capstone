const editUser = (user, newProps, setError) => {
    return async function(dispatch) {
        const token = await user.getIdToken();
        const response = await fetch(`/api/users/`, {
            method: 'PUT',
            body: JSON.stringify(newProps),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const result = await response.json();
            dispatch({ type: 'USER_REQUEST_SUCCESS', payload: { auth: user, data: result } });
        } else {
            const error = await response.json();
            setError(error);
        }
    }
}

export { editUser };
