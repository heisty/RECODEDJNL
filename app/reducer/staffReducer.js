let defaultState = {

}

module.exports = (state=defaultState,action)=>{
	switch(action.type){
		case "GET_RECORDS":
			return {
				records: action.records,
			}
		default:
			return state
	}
}