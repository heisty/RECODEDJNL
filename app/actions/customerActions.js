import axios from 'axios';
import {CancelToken} from 'axios';
import {
	CUST_IN,
	CUST_UP,
	AVAIL_SERVICE,
	UPDATE_CUSTOMER_INFO,
	COUNT_ACTIVE,
	POSITION_ACTIVE
} from '../api';

export const custIn=(username,password)=>{
	return async function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},1000);
		return await axios.post(CUST_IN,{username,password},{cancelToken: source.token}).then((response)=>{
			let { userid,username } = response.data;
			dispatch({
				type: "LOGGED_USER",
				userid,
				username,
				password: null,
				offline: false,
				displayOffline: true,
			});
		}).catch((error)=>{
			try{
			let message = "Sorry but for some reason, Cannot let you in.";
			if(error.response.status===404){
				console.warn("Signing Up.");
				dispatch(custUp(username,password));
			}
			if(error.response.status===401){
				dispatch({
					type: "RELOGIN",
					relogin: true,
				});
				console.warn("Wrong Password");
				message = "Sorry, your password is incorrect."
			}

			dispatch({
				type: "LOGIN_FAILED",
				loginfailed: true,
				message
			});

			console.warn("CUSTIN",error.response.status);
		}
		catch(error){
			dispatch({
				type: "CANNOT_CONNECT",
				connection:false,
				connDisplay: true
			})
			console.warn("SERVER NO CONN");
		}
	
			console.warn(error);

		});
	}
}

export const custUp=(username,password)=>{
	return async function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},1000);
		return await axios.post(CUST_UP,{username,password},{cancelToken: source.token}).then((response)=>{
			let { userid,username } = response.data;
			dispatch({
				type: "LOGGED_USER",
				userid,
				username,
				password: null,
				offline: false,
				displayOffline: true,
			});
			dispatch({
					type: "AUTO_SIGNUP",
					sign: true,
				});
		}).catch((error)=>{
			try{
			console.warn("CUSTUP",error.response.status);
			console.warn(error);
			}
			catch(error){
				dispatch({
				type: "CANNOT_CONNECT",
				connection:false,
				connDisplay: true,
			})
				console.warn("SERVER NO CONN")
			}

		});
	}
}


export const availService=(userid,serviceid,servicename,servicetype,staffid,staffname)=>{
	// this is a thenable twice insertions and a must.
	//first is insert to customer schema
	let position = null;
	return async function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},600);
		return await axios.post(COUNT_ACTIVE,{},{cancelToken: source.token}).then((response)=>{
			position = response.data.count;
			position+=1;
			if(servicetype==="home"){
				position=null;
			}


			
			
		})
		.then(()=>{
			console.warn(position);
			return axios.post(AVAIL_SERVICE,{userid,serviceid,servicename,servicetype,staffid,staffname,position}).then((response)=>{
				dispatch({
				type: "AVAIL_SUCCESS",
				availsuccess: true,
				message: "Your service is booked.",
				isDisplay: true,
			});
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

export const positionActive=(userid)=>{
	return function(dispatch){
		return axios.post(POSITION_ACTIVE,{userid}).then((response)=>{
			let position = response.data.position;
			dispatch({
				type: "CUSTOMER_QUEUE",
				position
			});
			dispatch({
				type: "AVAIL_SUCCESS",
				availsuccess: true,
				message: "Your service is booked.",
				isDisplay: false,
			});
			console.warn("POS",position);
		}).catch((error)=>{
			console.warn(error,error.response);
			dispatch({
				type: "CUSTOMER_QUEUE",
				position:undefined
			})
		})
	}
}
export const customerActive=()=>{
	return function(dispatch){
		return axios.post(COUNT_ACTIVE).then((response)=>{
			let total = response.data.count;
			dispatch({
				type: "CUSTOMER_COUNT",
				total
			})
			console.warn("POS",total);
		}).catch((error)=>{
			console.warn(error,error.response);
			dispatch({
				type: "CUSTOMER_COUNT",
				total:undefined
			})
		})
	}
}





// REMOVERS OF EFFECTS

export const removeLoginFailed = () =>({
	type: "LOGIN_FAILED",
	loginfailed: false,
	message: undefined,
});
export const removeAvailSuccess = (availsuccess,isDisplay) =>({
	type: "AVAIL_SUCCESS",
	availsuccess,
	message: undefined,
	isDisplay,
});
export const removeCannotConnect = (connection) =>({
	type: "CANNOT_CONNECT",
	connection,
	connDisplay: false,
});
export const offlineLogin = (username,password,displayOffline) =>({
	type: "LOGGED_USER",
	userid: null,
	username,
	password,
	offline: true,
	displayOffline
});

export const offlineLoginReset = () =>({
	type: "LOGGED_USER",
	userid: null,
	username: null,
	password: null,
	offline: null,
	displayOffline: null,
});


export const removeSign=(sign)=>({
	type: "AUTO_SIGNUP",
	sign,
	signDisplay: false,
});
export const removeOfflineDisplay=(serverconnection)=>({
	type: "AUTO_SIGNUP",
	serverconnection,
	offlineDisplay: false,
});