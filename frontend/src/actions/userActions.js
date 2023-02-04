import { 
    updateProfile, 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    updatePassword 
} from "firebase/auth";
import { 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from 'firebase/storage';
import { storage } from "../fire";

const editUser = (userAuth, newProps, setError) => {
    return async function(dispatch) {
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
    }
}

const uploadProfilePicture = (user, file, setUploading) => {
    return async function(dispatch) {
        const fileRef = ref(storage, user.auth.uid + '.png');

        setUploading(true);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        setUploading(false);

        await updateProfile(user.auth, { photoURL });
        dispatch({ type: 'USER_REQUEST_SUCCESS', payload: { auth: user.auth, data: user.data } });
    }
}

const updateUserPassword = (user, currentPassword, newPassword) => {
    return async function(dispatch) {
        const credential = EmailAuthProvider.credential(user.auth.email, currentPassword);
        await reauthenticateWithCredential(user.auth, credential);
        await updatePassword(user.auth, newPassword);
        dispatch({ type: 'USER_REQUEST_SUCCESS', payload: { auth: user.auth, data: user.data } });
    }
}

export { editUser, uploadProfilePicture, updateUserPassword };
