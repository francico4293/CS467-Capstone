import { auth } from "../fire";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { 
    USER_REQUEST, 
    USER_REQUEST_SUCCESS, 
    USER_REQUEST_FAILURE 
} from "../constants/userConstants";

const signInUser = (email, password, setError, navigate) => {
    return async function(dispatch) {
        try {
            dispatch({ type: USER_REQUEST });
            await signInWithEmailAndPassword(auth, email, password);
            dispatch({ type: USER_REQUEST_SUCCESS, payload: { isLoggedIn: true } });
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/profile');
        } catch (error) {
            dispatch({ type: USER_REQUEST_FAILURE });
            setError(error);
        };
    }
}

const signOutUser = (navigate) => {
    return async function(dispatch) {
        dispatch({ type: USER_REQUEST });
        await signOut(auth);
        dispatch({ 
            type: USER_REQUEST_SUCCESS, 
            payload: { isLoading: false, isLoggedIn: false }
        });
        sessionStorage.setItem('isLoggedIn', 'false');
        navigate('/login-signup');
    }
}

export { signInUser, signOutUser };
