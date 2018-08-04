import axios from 'axios';

import {AVAIL_SERVICE,ACTIVE_SERVICES,CAN_AVAIL,ADD_CUSTOMER_SERVICE,UPDATE_CUSTOMER_SERVICE} from '../api';
export const availServices=(userid,serviceid,servicetype,staffid,title)=>{
	return function(dispatch){
		return axios.post(AVAIL_SERVICE,{userid,serviceid,servicetype,staffid}).then((reponse)=>{
			let avail = 1;
			dispatch(availService(avail));
			let date = new Date();
			let active = true;

			// title is useless remove it no func args...

			// dispatch
			return axios.post(ADD_CUSTOMER_SERVICE,{userid,serviceid,staffid,date,active}).then((response)=>{

			}).catch((error)=>{
				console.warn(error.response);
				console.warn("Second dispatch at add customer");
			});


		}).catch((error)=>{
			console.warn(error.response);
			console.warn("SHIT ITS 1st nested");
		})
	}
}
export const alreadyHaveService=(userid)=>{
	return function(dispatch){
		return axios.post(CAN_AVAIL,{userid}).then((response)=>{
			let { canAvail } = response.data;
			dispatch(alreadyHaveServiceSetter(canAvail));
		}).catch((error)=>{
			console.warn("ERROR DETECTED AT THE YOU KNOW");
			console.warn(error.response);
			
		})
	}
}
export const returnActiveServices=(userid)=>{
	console.warn("Return Active Stated");
	return function(dispatch){
		return axios.post(ACTIVE_SERVICES,{userid}).then((response)=>{
		var services = response.data.services;
		dispatch(activeServices(activeservices))
		console.warn("Return Active Ended");
	}).catch((error)=>{
		console.warn(error.response);
		console.warn("Return Active Caught");
	})
	}
}
const activeServices = (activeservices) =>({
	type: "ACTIVE_SERVICES",
	activeservices	
});
const availService = (avail) =>({
	type: "AVAIL_STATE",
	avail	
});
const alreadyHaveServiceSetter = (canAvail) =>({
	type: "CAN_AVAIL",
	canAvail
});
export const availServiceDelete = (avail) =>({
	type: "AVAIL_STATE_DELETE",
});