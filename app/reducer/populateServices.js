import {services} from '../inappData/services';
var defaultState = {
	services : services
};
module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "POPULATE_SERVICES_LIST":
			return{
				services: action.services
			}
		case "ERROR_DISPATCH":
			return{
				pop_error: action.text
			}
			
		default:
			return state
	}
}