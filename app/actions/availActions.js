import axios from 'axios';

import {AVAIL_SERVICE,ACTIVE_SERVICES,CAN_AVAIL,ADD_CUSTOMER_SERVICE,UPDATE_CUSTOMER_SERVICE} from '../api';
export const availServices=(userid,serviceid,servicename,servicetype,staffid,staffname)=>{
	return function(dispatch){
		return axios.post(AVAIL_SERVICE,{userid,serviceid,servicetype,servicename,staffid,staffname}).then((reponse)=>{
			let avail = 1;
			dispatch(availService(avail));
			let date = new Date();
			let active = true;

			// 

			// dispatch
			return axios.post(ADD_CUSTOMER_SERVICE,{userid,serviceid,servicename,servicetype,staffid,staffname,date,active}).then((response)=>{

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
	return async function(dispatch){
		return await axios.post(CAN_AVAIL,{userid}).then((response)=>{
			let { canAvail } = response.data;
			dispatch(alreadyHaveServiceSetter(canAvail));
			console.warn(userid,canAvail);
		}).catch((error)=>{
			console.warn("ERROR DETECTED AT THE YOU KNOW ALREADYHVESERVICESETTER");
			console.warn(error.response);
			
		})
	}
}
export const returnActiveServices=(userid)=>{
	console.warn("Return Active Stated");
	return function(dispatch){

		console.warn(userid);
		console.warn("Userid");
		return axios.post(ACTIVE_SERVICES,{userid}).then((response)=>{
		var services = response.data.services;
		dispatch(activeServices(customer))
		console.warn(customer);
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
const alreadyHaveServiceSetter = (canAvailService) =>({
	type: "CAN_AVAIL_SERVICE",
	canAvailService
});
export const availServiceDelete = (avail) =>({
	type: "AVAIL_STATE_DELETE",
});