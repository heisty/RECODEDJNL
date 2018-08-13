import axios from 'axios';
import {CancelToken} from 'axios';
import {
	DEL_STAFF,
	SIGNUP_URL,
	ADD_SERVICE,
	UPDATE_SERVICE,
	DEL_SERVICE,
	DEL_CUST,
	SIGNIN_URL,
	LOGIN_ADMIN
} from '../api';

export const deleteStaff=(staffid)=>{
	return function(dispatch){
		return axios.post(DEL_STAFF,{staffid}).then((response)=>{
			console.warn("DELTREE");
		}).catch((error)=>{
			console.warn("DELSTAF",error);
		})
	}
}

export const registerStaff=(username,password)=>{
	return function(dispatch){
		return axios.post(SIGNUP_URL,{username,password}).then((response)=>{
			console.warn("SAVED");
		}).catch((error)=>{
			console.warn("regStaff",error);
		})
	}
}

export const addService = (title,description,price) =>{
	return function(dispatch){
		return axios.post(ADD_SERVICE,{title,description,price}).then((response)=>{
			console.warn("SERV SAVED");
		}).catch((error)=>{
			console.warn("ADDSER",error);
		});
	}
}

export const updateService = (serviceid,title,description,price) =>{
	return function(dispatch){
		return axios.post(UPDATE_SERVICE,{serviceid,title,description,price}).then((response)=>{
			console.warn("UPdASER");
		}).catch((error)=>{
			console.warn("UPDASER",error);
		})
	}
}

export const deleteService = (serviceid) =>{
	return function(dispatch){
		return axios.post(DEL_SERVICE,{serviceid}).then((response)=>{
			console.warn("DELSUC");
		}).catch((error)=>{
			console.warn("DelSer",error);
		});
	}
}

export const deleteByCustomerId = (userid) =>{
	return function(dispatch){
		return axios.post(DEL_CUST,{userid}).then((response)=>{
			console.warn("DELUSER");
		}).catch((error)=>{
			console.warn("DelUSER ERR",error);
		});
	}
}

export const signInAdmin = (username,password) =>{
	return function(dispatch){
		return axios.post(LOGIN_ADMIN,{username,password}).then((response)=>{
			console.warn("logged",response.data);
			
			
				let {username,_id} = response.data;
				dispatch({
					type: "IS_ADMIN",
					userid: _id,
					username,
					isadmin: true
				});
				console.warn("Admin");

				dispatch({
				type: "LOGIN_TYPE",
				login: "admin",
			});
			
		}).catch((error)=>{
			dispatch({
					type: "AUTH_FAILED",
					auth:false
				})
		});
	}
}

export const signInStaff = (username,password) =>{
	console.warn("RECEIVED--logged");
	return function(dispatch){
		return axios.post(SIGNIN_URL,{username,password}).then((response)=>{
			console.warn("RECEIVED--logged",response.data);
			let {userid,username} = response.data;
			
			dispatch({
				type: "LOGGED_STAFF",
				staffid: userid,
				staffname: username
			});

			dispatch({
				type: "LOGIN_TYPE",
				login: "staff",
			});
			console.warn(userid);
		}).catch((error)=>{
			console.warn(error);
			if(error.response.status===401){
				console.warn("401");
				dispatch({
					type: "AUTH_FAILED",
					auth:false,
				})
			}
			if(error.response.status===422){
				console.warn("422");
				dispatch(signInAdmin(username,password));
			}
		});
	}
}

