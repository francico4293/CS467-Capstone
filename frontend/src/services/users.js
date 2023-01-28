import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../fire";

const signUpUser = async (email, password, firstName, lastName, setError) => {
    try {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await createUser(user, firstName, lastName);
    } catch (error) {
        setError(error);
    };
}

const signInUser = async (email, password, setError) => {
    try {
        await signInWithEmailAndPassword(email, password)
    } catch (error) {
        setError(error);
    };
}

const signOutUser = (history) => {
    signOut();
    history.push('/');
};

const createUser = async (user, firstName, lastName) => {
    const token = await user.getIdToken();
    const response = await fetch(`/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { signInUser, signOutUser, signUpUser }