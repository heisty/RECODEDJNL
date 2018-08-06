import {SIGNIN_URL,SIGNUP_URL,CUSTOMER_SIGNIN_URL,CUSTOMER_SIGNUP_URL} from '../api';
import axios from 'axios';
import {CancelToken} from 'axios';






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
		console.warn("It started and will execute");
		return axios.post(CUSTOMER_SIGNIN_URL,{username,password}).then((response)=>{
	
			console.warn("It requested and succeed");
			var {userid,username,error} = response.data;
			
			dispatch(customerAuthUser(userid,username));
			
			console.warn("It ended and executed");
		}).catch((error)=>{
			console.warn("It got caught");

			try{
				//console.warn(error.response.status);
				if(error.response.status===401){
					dispatch(customerLoginFailed(true));
					console.warn("It dispatched it");
				}
			}
			catch(error){
				console.warn("Oppa caught a network error at signin");
			}

		})
	}
}

export const loginCustomerUser = (username,password)=>{
	return function(dispatch){

		// in case shits appear esp. network f*%

		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},600);


		console.warn("Oppa. I got a green light.");
		return axios.post(CUSTOMER_SIGNUP_URL,{username,password},{cancelToken: source.token}).then((response)=>{
			//console.warn("Oppa this is bad but Its bou to it");
			var {userid,username} = response.data;
			dispatch(customerAuthUser(userid,username));
		//console.warn("Oppa this is bad but It dispatched it");
		}).catch((error)=>{
			try{
			console.warn("Routing to Signin");
			if(error.response.status === 422){
			console.warn("Since taken well be logging in");
			dispatch(signInCustomerUser(username,password));
			}
			}
			catch(error){
				console.warn("Oppa caught a network error at the signup");
				dispatch(customerAuthUserNotOnline(username,password));
				console.warn("I temporarily dispatched their chosen username and password.");
			}

			
		});
	}
}

export const customerNavigate=(isAlreadyNavigated)=>({
	type: "IS_ALREADY_NAVIGATED",
	isAlreadyNavigated,
})

export const customerLoginFailed = (customerFailed) =>({
	type: "CUSTOMER_LOGIN_FAILED",
	customerFailed

})
const customerAuthUser = (userid,username) => ({
	type: 'AUTH_CUSTOMER',
	userid,
	username
});
const customerAuthUserNotOnline = (username,password) => ({
	type: 'AUTH_CUSTOMER',
	username,
	password
})


const authUser = (userid,username) =>({
	type: 'AUTH_USER',
	userid,
	username
});
export const unauthUser = ({
	type: 'UNAUTH_USER',
	
});


