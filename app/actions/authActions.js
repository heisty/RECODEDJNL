import {SIGNIN_URL,SIGNUP_URL,CUSTOMER_SIGNIN_URL,CUSTOMER_SIGNUP_URL} from '../api';
import axios from 'axios';
import {addAlert} from './alertsActions';


export const loginStaffUser = (username,password) =>{
	return function(dispatch){
		return axios.post(SIGNIN_URL,{username,password}).then((response) =>{
			var {userid,username,token} = response.data;
			dispatch(authUser(userid,username));
		}).catch((error) =>{
			dispatch(addAlert('Could not login',true));
		})
	}
}

export const signInCustomerUser = (username,password)=>{
	return function(dispatch){
		return axios.post(CUSTOMER_SIGNIN_URL,{username,password}).then((response)=>{
			var {userid,username} = response.data;
			dispatch(customerAuthUser(userid,username));
		}).catch((error)=>{

		})
	}
}

export const loginCustomerUser = (username,password)=>{
	return function(dispatch){
		return axios.post(CUSTOMER_SIGNUP_URL,{username,password}).then((response)=>{
			var {userid,username} = response.data;
			dispatch(customerAuthUser(userid,username));
		}).catch((error)=>{
			if(error.response.status === 422){
			dispatch(signInCustomerUser(username,password));
			}
			
		});
	}
}


const customerAuthUser = (userid,username) => ({
	type: 'AUTH_CUSTOMER',
	userid,
	username
})

const authUser = (userid,username) =>({
	type: 'AUTH_USER',
	userid,
	username
});
export const unauthUser = ({
	type: 'UNAUTH_USER',
	
});


