
import {SIGNIN_URL,SIGNUP_URL} from '../api';
export const addAlert = (text) =>({
	type: 'ADD_ALERT',
	text
});
export const removeAlert = (id) =>({
	type: 'REMOVE_ALERT',
	id
});


