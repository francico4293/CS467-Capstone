const getContacts = async (userAuth, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/contacts/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        const contacts = await response.json()
        return contacts
    } else {
        const error = await response.json()
        setError(error.error)
    }
}

const createContact = async (userAuth, newContact, setError) => {

    const token = await userAuth.getIdToken();
    const response = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(newContact),
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

export { getContacts, createContact }