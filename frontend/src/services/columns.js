
const createColumn = async (userAuth, newColumn, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch('/api/columns', {
        method: 'POST',
        body: JSON.stringify(newColumn),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        const error = await response.json()
        setError(error.error);
    }
}

const deleteColumn = async (userAuth, columnId, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/columns/${columnId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status !== 204) {
        const error = await response.json()
        setError(error.error);
    }
}

const editColumn = async (userAuth, columnId, newColumn, setError) => {

    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/columns/${columnId}`, {
        method: 'PUT',
        body: JSON.stringify(newColumn),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        const error = await response.json()
        setError(error.error);
    }
}

export { createColumn, editColumn, deleteColumn }