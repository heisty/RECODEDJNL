import {
	GET_APPOINTMENT,
	GET_STAFF_TRANSACTION,
	GET_STAFF_PROFILE,
	UPDATE_STAFF_PROFILE,
	DEL_AVAIL
} from '../api';
import axios from 'axios';
import {CancelToken} from 'axios';

export const getAppointment = (staffid) =>{
	return function(dispatch){
		return axios.post(GET_APPOINTMENT,{staffid}).then((response)=>{
			let {appointment} = response.data;
			dispatch({
				type: "GET_APPOINTMENT",
				appointment
			})

			//if(!appointment.isEmpty({})){
				dispatch({
					type: "AVAIL_SUCCESS",
					availsuccess: false,
					message: null,
					isDisplay: null,
				})
			//}
		}).catch((error)=>{
			console.warn("GET APPOINTMENT",error);
		});
	}
}

export const getStaffTransaction = (staffid) =>{
	return function(dispatch){
		return axios.post(GET_STAFF_TRANSACTION,{staffid}).then((response)=>{
			let {transaction} = response.data;
			dispatch({
				type: "GET_TRANSACTION",
				transaction
			})
		}).catch((error)=>{
			console.warn("GET STAFFTRANS",error);
		});

	}
}

export const getStaffProfile = (staffid) =>{
	return function(dispatch){
		return axios.post(GET_STAFF_PROFILE,{staffid}).then((response)=>{
			let profile = response.data;
			let username = profile.staff.username;
			dispatch({
				type: "GET_STAFF_PROFILE",
				username
			})
			console.warn(username);

		}).catch((error)=>{
			console.warn("GET STAFFPROF",error);
		});
	}
}

export const updateStaffProfile = (staffid) =>{
	return function(dispatch){
		return axios.post(UPDATE_STAFF_TRANSACTION,{staffid}).then((response)=>{

		}).catch((error)=>{
			console.warn("UPDATE STAFFTRANS",error);
		});
	}
}

export const deleteAvail = (availid) =>{
	return function(dispatch){
		return axios.post(DEL_AVAIL,{availid}).then((response)=>{
			console.warn("DELETE AVAIL SUC");
		}).catch((error)=>{
			console.warn("DELA FAi");
		})
	}
}

