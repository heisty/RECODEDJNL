var defaultState = {
	connectionType: undefined,
	ipAddress: undefined,
	isConnected: undefined,
	isDisplayable: undefined,
	isServer:undefined,
	isDisplayable:undefined

}
module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "IS_CONNECTED":
			return {
				isConnected: action.isConnectedYet,
				isDisplayable: action.isDisplayable,
			}
		case "IS_SERVER":
			return{
				isServer: action.isServer,
				isDisplayable: action.isServerDisplayable,
			}
		case "IP_ADDRESS":
			return {
				ipAddress: action.ipAddress,
			}
		default:
			return state
	}
}