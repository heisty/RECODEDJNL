let defaultState = {
	loginfailed: undefined,
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
	case "LOGIN_FAILED":
		return{
			...state,
			loginfailed: action.loginfailed,
			message: action.message,
		}
	case "AVAIL_SUCCESS":
		return{
			...state,
			availsuccess: action.availsuccess,
			message: action.message,
			isDisplay: action.isDisplay,
		}
	default:
		return state
	}
}