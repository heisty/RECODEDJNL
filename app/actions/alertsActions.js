
import {SIGNIN_URL,SIGNUP_URL} from '../api';
export const addAlert = (text,canbe) =>({
	type: 'STATUS_ALERT',
	text,
	canbe
});



