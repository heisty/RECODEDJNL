let defaultState = {
	loginfailed: undefined,
}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
	case "AVAIL_SUCCESS":
		return{
			...state,
			availsuccess: action.availsuccess,
			message: action.message,
			isDisplay: action.isDisplay,
		}
	case "CANNOT_CONNECT":
	 	return{
	 		...state,
	 		connection: action.connection,
	 		connDisplay: action.connDisplay,
	 	}
	case "SERVER_CONNECTED":
		return{
			...state,
			serverconnection: action.serverconnection,
			offlineDisplay: action.offlineDisplay,
			stop: action.stop,
		}
	case "RELOGIN":
		return{
			relogin: action.relogin,
			message: action.message,
		}
	case "AUTO_SIGNUP":
		return{
			...state,
			sign: action.sign,
			signDisplay: action.signDisplay,
		}
	default:
		return state
	}
}