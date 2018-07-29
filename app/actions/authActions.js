import {SIGNIN_URL,SIGNUP_URL} from '../api';
import axios from 'axios';



export const loginUser = (username,password) =>{
	return function(dispatch){
		return axios.post(SIGNIN_URL,{username,password}).then((response) =>{
			var {user_id,token} = response.data;
			dispatch(authUser(user_id));
		}).catch((error) =>{
			
		})
	}
}

const authUser = (user_id) =>({
	type: 'AUTH_USER',
	user_id
});
export const unauthUser = ({
	type: 'UNAUTH_USER',
	
});


