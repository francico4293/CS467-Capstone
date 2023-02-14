import {
    beforeAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    sendPasswordResetEmail,
    deleteUser
} from "firebase/auth";
import { auth } from "../fire";

const signUpUser = async (email, password, firstName, lastName, setError, setErrorMessage) => {
    try {
        const unsubscribe = beforeAuthStateChanged(auth, async (user) => {
            await createUserInDatabase(user, firstName, lastName);
        })
        await createUserWithEmailAndPassword(auth, email, password);
        unsubscribe();
    } catch (error) {
        setError(error);
    };
}

const signInUser = async (email, password, setError) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        setError(true);
    };
}

const signInWithGoogle = async (setError) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            setError(true);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;

            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

const signOutUser = async () => {
    await signOut(auth);
};

const createUserInDatabase = async (user, firstName, lastName) => {
    const token = await user.getIdToken();
    await fetch(`/api/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const getUser = async (user, setError) => {
    const token = await user.getIdToken();
    const response = await fetch(`/api/users/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.json()
    } else {
        const error = await response.json()
        setError(error)
    }
}

const editUser = async (user, newProps, setError) => {
    const token = await user.getIdToken();
    const response = await fetch(`/api/users/`, {
        method: 'PUT',
        body: JSON.stringify(newProps),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        return response.json()
    } else {
        const error = await response.json()
        setError(error)
    }
}

const updateUserPassword = async (user, currentPassword, newPassword) => {
    const credential = EmailAuthProvider.credential(user.auth.email, currentPassword);
    await reauthenticateWithCredential(user.auth, credential);
    return await updatePassword(user.auth, newPassword);
}

const sendUserPasswordResetEmail = async (email) => {
    return await sendPasswordResetEmail(auth, email);
}

const deleteUserAccount = async (user, password) => {
    const credential = EmailAuthProvider.credential(user.auth.email, password);
    await reauthenticateWithCredential(user.auth, credential);
    return await deleteUser(user.auth);
}

export { 
    signInUser, 
    signOutUser, 
    signUpUser, 
    getUser, 
    editUser, 
    signInWithGoogle, 
    updateUserPassword,
    sendUserPasswordResetEmail,
    deleteUserAccount
};
