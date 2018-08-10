import {
	GEO_SUPPORT
} from '../api';
import axios from 'axios';

export const transformToAddress=(lat,long)=>{
	return function(dispatch){
		let geo_url = `${GEO_SUPPORT}latlng=${lat},${long}&sensor=false`;
		return axios.get(geo_url).then((response)=>{
			let results = response.data.results;
			console.warn("SUCCESS GPS",results);
		}).catch((error)=>{
			console.warn("ADDRESS NO",error,error.response);
		});
	}
}