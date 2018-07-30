var defaultState = {
	customerId: undefined,
	customerUsername: undefined,
}
module.exports = (state={},action) =>{
	switch(action.type){
	case "AUTH_CUSTOMER": 
		return {
			customerId: action.userid,
			customerUsername: action.username,

		}
	default: 
		return state
	}
}