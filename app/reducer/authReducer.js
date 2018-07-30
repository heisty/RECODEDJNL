

var defaultState = {
	userid: undefined,
}
module.exports = (state=defaultState,action) =>{
	switch(action.type){
		case 'AUTH_USER':
			return{
				userid: action.userid, 
				username: action.username
			}
		case 'UNAUTH_USER':
			return{
				userid: undefined
			}
		default:
			return state;
	}
}