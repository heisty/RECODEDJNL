var defaultState = {
	connectionType: null,
	ipAddress: null
}
module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "CONNECTION_TYPE_CHANGE":
			return {
				connectionType: action.connectionType,
			}
		case "IP_ADDRESS":
			return {
				ipAddress: action.ipAddress,
			}
		default
			return state
	}
}