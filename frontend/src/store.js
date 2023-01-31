import { 
    legacy_createStore as createStore, 
    combineReducers 
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { themeReducer } from './reducers/themeReducer';

const reducers = combineReducers({ 
    user: userReducer,
    theme: themeReducer
});

const themeFromSessionStorage = sessionStorage.getItem('theme') 
    ? sessionStorage.getItem('theme') 
    : 'light';

const initialState = { theme: themeFromSessionStorage };

const store = createStore(reducers, initialState, composeWithDevTools());

export default store;
