let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "IS_ADMIN":
			return{
				...state,
				userid: action.userid,
				username: action.username,
				isAdmin: action.isadmin,
			}
		
		case "LOGGED_STAFF":
			return {
				...state,
				staffid: action.staffid,
				staffname: action.staffname,

			}
		case "GET_RECORDS":
			return {
				...state,
				records: action.records,
			}
		case "GET_APPOINTMENT":
			return{
				...state,
				appointment: action.appointment,
			}
		case "GET_TRANSACTION":
			return{
				...state,
				transaction: action.transaction,
			}
		case "GET_STAFF_PROFILE":
			return{
				...state,
				username: action.username,
			}
		default:
			return state
	}
}