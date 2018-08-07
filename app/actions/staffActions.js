import axios from 'axios';
import {CancelToken} from 'axios';
import {
	DEL_STAFF,
	SIGNUP_URL,
	ADD_SERVICE,
	UPDATE_SERVICE,
	DEL_SERVICE,
	DEL_CUST
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
