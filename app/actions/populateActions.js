import {POPULATE_SERVICES,POPULATE_STAFF} from '../api';
import axios from 'axios';

export const getServices = () =>{
	return async function(dispatch){
		return await axios.post(POPULATE_SERVICES).then((response)=>{
			
			var services = response.data.services;
			dispatch(populateServices(services));
			
			//console.warn(services);

		}).catch((error)=>{
			try{
			console.warn(error.response.status);
		}
		catch(error){
			console.warn("DAMN NETWORK LEVEL ERROR, HIT OUR LIST OF SERVICES")
		}
		});
	}
}



const populateServices = (services) =>({
	type: "POPULATE_SERVICES_LIST",
	services
});

const popError = (text) =>({
	type: "ERROR_DISPATCH",
	text
});

export const getStaff = () =>{
	return async function(dispatch){
		return await axios.post(POPULATE_STAFF).then((response)=>{
			var staff = response.data.staff;
			dispatch(populateStaff(staff));
			//console.warn(staff);
		}).catch((error)=>{
			console.warn(error);
		})
	}
}

const populateStaff = (staff) =>({
	type: "POPULATE_STAFF",
	staff
});