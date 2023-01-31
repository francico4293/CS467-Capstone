import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../fire";

const signUpUser = async (email, password, firstName, lastName, setError) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await createUserInDatabase(user, firstName, lastName);
    } catch (error) {
        setError(error);
    };
}

const signInUser = async (email, password, setError) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        setError(error);
    };
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

export { signInUser, signOutUser, signUpUser }
