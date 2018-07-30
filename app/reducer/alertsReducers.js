import uuid from 'uuid';

var defaultState = {
	alert: 'Please Login to manage your account',
	canbe: false,
}
module.exports = (state=defaultState,action) =>{
	switch(action.type){
		case 'STATUS_ALERT':
		return {
			alert: action.text,
			canbe: action.canbe,
		}
		default:
			return state;
	}
}