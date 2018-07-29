import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertsReducer from './alertsReducers';
module.exports = combineReducers({
	auth: authReducer,
	alerts: alertsReducer,
});
