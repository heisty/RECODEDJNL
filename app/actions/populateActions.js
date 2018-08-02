import {POPULATE_SERVICES} from '../api';
import axios from 'axios';

export const getServices = () =>{
	return function(dispatch){
		return  axios.post(POPULATE_SERVICES).then((response)=>{
			
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
})