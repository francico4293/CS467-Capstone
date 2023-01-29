import { 
    legacy_createStore as createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { themeReducer } from './reducers/themeReducers';
import { userReducer } from './reducers/userReducers';

const reducer = combineReducers({ 
    theme: themeReducer,
    user: userReducer
});

const themeFromSessionStorage = sessionStorage.getItem('theme') 
    ? sessionStorage.getItem('theme') 
    : 'light';

const isLoggedInFromSessionStorage = sessionStorage.getItem('isLoggedIn') 
    ? sessionStorage.getItem('isLoggedIn') === 'true'
    : false;

const initialState = {
    theme: { type: themeFromSessionStorage },
    user: { isLoading: false, isLoggedIn: isLoggedInFromSessionStorage }
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
