import axios from 'axios';
import {
	CUST_IN,
	CUST_UP,
	AVAIL_SERVICE,
	UPDATE_CUSTOMER_INFO
} from '../api';

export const custIn=(username,password)=>{
	return async function(dispatch){
		return await axios.post(CUST_IN,{username,password}).then((response)=>{
			let { userid,username } = response.data;
			dispatch({
				type: "LOGGED_USER",
				userid,
				username
			});
		}).catch((error)=>{
			let message = "Sorry but for some reason, Cannot let you in.";
			if(error.response.status===404){
				console.warn("Signing Up.");
				dispatch(custUp(username,password));
			}
			if(error.response.status===401){
				console.warn("Wrong Password");
				message = "Sorry, your password is incorrect."
			}

			dispatch({
				type: "LOGIN_FAILED",
				loginfailed: true,
				message
			});

			console.warn("CUSTIN",error.response.status);
			console.warn(error);
		});
	}
}

export const custUp=(username,password)=>{
	return async function(dispatch){
		return await axios.post(CUST_UP,{username,password}).then((response)=>{
			let { userid,username } = response.data;
			dispatch({
				type: "LOGGED_USER",
				userid,
				username
			});
		}).catch((error)=>{
			console.warn("CUSTUP",error.response.status);
			console.warn(error);
		});
	}
}


export const availService=(userid,serviceid,servicename,servicetype,staffid,staffname)=>{
	// this is a thenable twice insertions and a must.
	//first is insert to customer schema

	return async function(dispatch){
		return await axios.post(AVAIL_SERVICE,{userid,serviceid,servicename,servicetype,staffid,staffname}).then((response)=>{
			dispatch({
				type: "AVAIL_SUCCESS",
				availsuccess: true,
				message: "Your service is booked.",
				isDisplay: true,
			})
		})
		.then(()=>{
			return axios.post().then((response)=>{

			}).catch((error)=>{
				console.warn(error,error.response,error.response.status);
			})
		})
		.catch((error)=>{
			console.warn(error,error.response,error.response.status);
		})
	}

}

export const updateCustomerInfo=(
	userid,
	serviceid,
	servicename,
	servicetype,
	staffid,
	staffname,
	firstname,
	lastname,
	contact,
	street,
	brgy,
	city
	)=>{

	return function(dispatch){
		return axios.post(UPDATE_CUSTOMER_INFO,{userid,firstname,lastname,contact}).then((response)=>{
			console.warn("Success");
			dispatch(availService(userid,serviceid,servicename,servicetype,staffid,staffname));
		}).catch((error)=>{
			console.warn("Not update");
		})
	}
}





// REMOVERS OF EFFECTS

export const removeLoginFailed = () =>({
	type: "LOGIN_FAILED",
	loginfailed: false,
	message: undefined,
})
export const removeAvailSuccess = (availsuccess,isDisplay) =>({
	type: "AVAIL_SUCCESS",
	availsuccess,
	message: undefined,
	isDisplay,
})