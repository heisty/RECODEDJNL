var defaultState = {
	customerId: null,
	customerUsername: null,
	customerUsernameNotOnline: null,
	customerPasswordNotOnline: null

}
module.exports = (state={},action) =>{
	switch(action.type){
	case "AUTH_CUSTOMER": 
		return {
			customerId: action.userid,
			customerUsername: action.username,

		}
	case "NOT_ONLINE_USER":
			return{
				customerUsernameNotOnline: action.username,
				customerPasswordNotOnline: action.password,
			}
	default: 
		return state
	}
}