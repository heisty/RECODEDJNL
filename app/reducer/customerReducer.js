let defaultState = {

}
module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "LOGGED_USER":
			return{

				userid: action.userid,
				username: action.username,
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
		default:
			return state
	}
}