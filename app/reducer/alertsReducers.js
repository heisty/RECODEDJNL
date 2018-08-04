import uuid from 'uuid';

var defaultState = {
	alert: 'Please Login to manage your account',
	canbe: false,
	availState: 0,
	canAvail: true,
}
module.exports = (state=defaultState,action) =>{
	switch(action.type){
		case "STATUS_ALERT":
			return {
			alert: action.text,
			canbe: action.canbe,
		}
		case "AVAIL_STATE":
			return{
			availState: action.avail
		}
		case "CAN_AVAIL":
			return{
				canAvail: action.canAvail
			}
		case "AVAIL_STATE_DELETE":
			return{
			availState: 0
		}
		default:
			return state;
	}
}