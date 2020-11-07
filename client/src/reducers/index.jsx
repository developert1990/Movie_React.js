import { combineReducers } from 'redux';
import { loginReducer } from './fetchLogin.jsx';

export default combineReducers({
    loginStore: loginReducer,
})