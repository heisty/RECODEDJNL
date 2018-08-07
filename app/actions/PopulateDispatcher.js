import axios from 'axios';
import {POP_SERVICES,POP_STAFF,POP_CUST,POP_REC} from '../api';




export const populateDispatcher = () =>{
	return async function(dispatch){
		// dispatch the services list 
		return await axios.post(POP_SERVICES).then((response)=>{
			var services = response.data.services;
			dispatch({
				type: "POP_SERVICES",
				services
			});
			console.warn("POP_SERVICES SUCCEED",services);
			dispatch(populateStaff());
		}).catch((error)=>{
			console.warn("The error is int the populateDispatcher second request with this error: ",error," and this error response: ",error.response);
		});

		
	}
}

export const populateStaff = () =>{
		return async function(dispatch){
		// dispatch the services list 
		return await axios.post(POP_STAFF).then((response)=>{
			var staff = response.data.staff;
			dispatch({
				type: "POP_STAFF",
				staff
			});
			console.warn("POP_STAFF SUCCEED",staff);
		}).catch((error)=>{
			console.warn("The error is int the populateDispatcher second request with this error: ",error," and this error response: ",error.response);
		});

		
	}
}

export const populateCustomer = () =>{
	return async function(dispatch){
		return axios.post(POP_CUST).then((response)=>{
			var customer = response.data.customer;
			dispatch({
				type: "POP_CUSTOMER",
				customer
			});
			console.warn("POP_CUST SUCCEED",customer);
		}).catch((error)=>{
			console.warn("popcust",error);
		});
	}
}

export const populateCustomerServices = (userid) =>{
	return async function(dispatch){
		// NEED TO GET THE USER SERVICES HE IS WHETHER ACTIVE OR NOT

		return await axios.post().then(()=>{

		}).catch((error)=>{
			console.warn("")
		});
	}
}

export const getRecords = () =>{
	return async function(dispatch){
		return axios.post(POP_REC).then((response)=>{
			let records = response.data.records;

			dispatch({
				type: "GET_RECORDS",
				records
			})
			console.warn("REC RET SUC");
		}).catch((error)=>{
			console.warn("REC RET FAI",error,error.response);
		})
	}
}