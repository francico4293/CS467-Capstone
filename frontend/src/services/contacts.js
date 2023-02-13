import { 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from 'firebase/storage';
import { storage } from "../fire";
import { v4 as uuidv4 } from 'uuid';

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
    if (newContact.companyLogo !== null) {
        newContact.companyLogo = await uploadCompanyLogo(newContact.companyLogo);
    }

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

const uploadCompanyLogo = async (companyLogo) => {
    const fileRef = ref(storage, 'company-logos/' + uuidv4() + '-' + companyLogo.name);
    await uploadBytes(fileRef, companyLogo);
    return await getDownloadURL(fileRef);
}

export { getContacts, createContact }