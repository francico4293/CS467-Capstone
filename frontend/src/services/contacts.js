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

const createContact = async (userAuth, newContact, photo, setError) => {
    if (newContact.contactPhoto !== null) {
        newContact.contactPhoto = await uploadContactPhoto(photo);
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

const uploadContactPhoto = async (contactPhoto) => {
    const fileRef = ref(storage, 'contact-photos/' + uuidv4() + '.png');
    await uploadBytes(fileRef, contactPhoto);
    return await getDownloadURL(fileRef);
}

export { getContacts, createContact }