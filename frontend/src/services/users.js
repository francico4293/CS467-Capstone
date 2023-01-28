import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../fire";

const signUpUser = async (email, password, firstName, lastName, setError, navigate) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await createUser(user, firstName, lastName);
        navigate('/profile');
    } catch (error) {
        setError(error);
    };
}

const signInUser = async (email, password, setError, navigate) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/profile');
    } catch (error) {
        setError(error);
    };
}

const signOutUser = async (navigate) => {
    await signOut(auth);
    navigate('/login-signup');
};

const createUser = async (user, firstName, lastName) => {
    const token = await user.getIdToken();
    await fetch(`/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export { signInUser, signOutUser, signUpUser }