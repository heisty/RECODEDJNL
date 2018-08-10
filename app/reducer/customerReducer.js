import {staff} from '../inappData/staff';
import {services} from '../inappData/services';
let defaultState = {
	staff: staff,
	customer: undefined,
	services: services
}
module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "LOGGED_USER":
			return{
				...state,
				userid: action.userid,
				username: action.username,
				password: action.password,
				offline: action.offline,
				displayOffline: action.displayOffline,
			}
		case "UNLOGGED_USER":
			return{
				...state,
				userid: null,
				username: null,
				password: null,
				offline: null,
				displayOffline: null,
			}
		case "CUST_ACTIVE_SERVICE":
				return{
					...state,
					activeservice: action.services,
				}
		case "CUSTOMER_QUEUE":
			return{
				...state,
				position: action.position,
			}
		case "CUSTOMER_COUNT":
			return{
				...state,
				total: action.total
			}
		case "POP_SERVICES":
			return{
				...state,
				services: action.services,
			}
		case "POP_STAFF":
			return{
				...state,
				staff: action.staff,
			}
		case "POP_CUSTOMER":
			return{
				...state,
				customer: action.customer,
			}
		default:
			return state
	}
}