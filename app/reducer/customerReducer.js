import {staff} from '../inappData/staff';
let defaultState = {
	staff: staff,
	customer: undefined,
	services: undefined
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