const editUser = (userAuth, newProps, setUpdating, setError) => {
    return async function(dispatch) {
        setUpdating(true);
        const token = await userAuth.getIdToken();
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
            dispatch({ type: 'USER_REQUEST_SUCCESS', payload: { auth: userAuth, data: result } });
        } else {
            const error = await response.json();
            setError(error);
        }
        setUpdating(false);
    }
}

export { editUser };
