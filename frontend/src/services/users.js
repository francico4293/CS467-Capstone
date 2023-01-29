import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../fire";

const signUpUser = async (email, password, confirmPassword, firstName, lastName, setError, navigate) => {
    try {
        if (password !== confirmPassword) {
            throw new Error();
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await createUser(user, firstName, lastName);
        navigate('/profile');
    } catch (error) {
        setError(error);
    };
}

const createUser = async (user, firstName, lastName) => {
    const token = await user.getIdToken();
    await fetch(`/users/`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export { signUpUser };
