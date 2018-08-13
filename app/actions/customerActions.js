import axios from 'axios';
import {CancelToken} from 'axios';
import {
	CUST_IN,
	CUST_UP,
	AVAIL_SERVICE,
	UPDATE_CUSTOMER_INFO,
	COUNT_ACTIVE,
	POSITION_ACTIVE,
	ACTIVE_SERVICES,
	UPDATE_CUSTOMER_ADDRESS,
	ADD_CUSTOMER_SERVICE,
	CUST_QUEUE,
	FIND_ADDR_EXIST
} from '../api';

export const custIn=(username,password)=>{
	return async function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},3000);
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
			dispatch({
				type: "LOGIN_TYPE",
				login: "customer",
			});
			dispatch({
				type: "SERVER_CONNECTED",
				offlineDisplay: false,
			})
		}).catch((error)=>{
			try{
			let message = "Sorry but for some reason, Cannot let you in.";
			if(error.response.status===404){
				console.warn("Signing Up.");
				dispatch(authState(false));
			}
			if(error.response.status===401){
				dispatch({
					type: "RELOGIN",
					relogin: true,
					message: "Sorry but wrong password. Or the username is already taken."
				});
				dispatch(offlineLogin(null,null));
				console.warn("Wrong Password");
				message = "Sorry, your password is incorrect."
			}

			dispatch({
				type: "LOGIN_FAILED",
				loginfailed: true,
				message
			});

			dispatch({
				type: "SERVER_CONNECTED",
				offlineDisplay: true,
			})

			console.warn("CUSTIN",error.response.status);
		}
		catch(error){

			dispatch({
				type: "LOGGED_USER",
				userid: null,
				username,
				password,
				offline: true,
				displayOffline: true,
			});

			
			console.warn("SERVER NO CONN");
		}
	
			console.warn("CUSTIN CTACH OUTER","ERROR",error.reponse.data.error,"TIMEOUT",error.response.timeout);

		});
	}
}

export const custUp=(username,password)=>{
	return async function(dispatch){
		let source = CancelToken.source();
		setTimeout(()=> {
			source.cancel();
			},3000);
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
					signDisplay:true
				});
			dispatch({
				type: "LOGIN_TYPE",
				login: "customer"
			})
			dispatch({
				type: "SERVER_CONNECTED",
				offlineDisplay: false,
			})
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
			});
				dispatch({
				type: "LOGGED_USER",
				userid: null,
				username,
				password,
				offline: true,
				displayOffline: true,
			});
				dispatch({
				type: "SERVER_CONNECTED",
				offlineDisplay: true,
			})
				console.warn("SERVER NO CONN")
			}

		});
	}
}


export const availService=(userid,username,serviceid,servicename,servicetype,staffid,staffname)=>{
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
			return axios.post(AVAIL_SERVICE,{userid,username,serviceid,servicename,servicetype,staffid,staffname,position}).then((response)=>{
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



export const saveToActiveService = (userid,username,serviceid,servicename,servicetype,staffid,staffname,date) =>{
	return function(dispatch){
		console.warn("RECEIVE DISPATCHING");
		return axios.post(ADD_CUSTOMER_SERVICE,{userid,username,serviceid,servicename,servicetype,staffid,staffname,date}).then((response)=>{

			console.warn("Succeed");

		}).catch((error)=>{
			console.warn("AVETIACTIVESER",error);
		});
	}
}

export const updateCustomerInfo=(
	userid,
	firstname,
	lastname,
	contact,
	street,
	brgy,
	city,
	munc,
	latitude,
	longitude,
	)=>{

	return function(dispatch){
		return axios.post(UPDATE_CUSTOMER_INFO,{userid,firstname,lastname,contact}).then((response)=>{
			console.warn("Success");
			dispatch(saveCustomerAddress(userid,street,brgy,munc,city,latitude,longitude))
			dispatch(alertMessageX("Fill Up Success.","We have recorded your data"));
			
		}).catch((error)=>{
			console.warn("Not update",error);
		})
	}
}


export const saveCustomerAddress = (userid,street,brgy,munc,city,latitude,longitude) =>{
	return function(dispatch){
		return axios.post(UPDATE_CUSTOMER_ADDRESS,{userid,street,brgy,munc,city,latitude,longitude}).then((response)=>{
			console.warn("Success SCA");
		}).catch((error)=>{
			console.warn("SCA",error)
		})
	}
}

export const findAddrExist = (userid) =>{
	return function(dispatch){
		return axios.post(FIND_ADDR_EXIST,{userid}).then((response)=>{
			let found = response.data.found;
			
			dispatch({
				type: "ADDR_STATE",
				found,
			})
			console.warn("FAE",found);
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


export const returnActive = (userid) =>{
	return function(dispatch){
		return axios.post(ACTIVE_SERVICES,{userid}).then((response)=>{
				let services = response.data.services;
				dispatch({
					type: "CUST_ACTIVE_SERVICE",
					services
				});
			if(services.length===0){
				dispatch({
				type: "AVAIL_SUCCESS",
				availsuccess: false,
				message: null,
				isDisplay: null,
			});
			}
			console.warn("RA",services);
		}).catch((error)=>{
			console.warn("RA",error);
		})
	}
}

export const customerQueue = (position) =>{
	return function(dispatch){
		return axios.post(CUST_QUEUE,{position}).then((response)=>{
			console.warn("CQSuccess");
		}).catch((error)=>{
			console.warn("CQ",error)
		})
	}
}





// REMOVERS OF EFFECTS

export const alertMessageX = (header,message) => ({
	type: "ALERT",
	header,
	message,
})
export const loginState = (login) =>({
	type: "LOGIN_TYPE",
	login
})

export const authState = (auth) =>({
	type: "AUTH_FAILED",
	auth
});

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

export const reloginSet = () =>({
	type: "RELOGIN",
	relogin: false,
	message: null,
})


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
export const unloggedUser=()=>({
	type: "UNLOGGED_USER",
})