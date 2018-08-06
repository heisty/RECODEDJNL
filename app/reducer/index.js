import {combineReducers} from 'redux';
import staffReducer from './staffReducer';
import customerReducer from './customerReducer';
import alertReducer from './alertReducer';
import connectionReducer from './connectionReducer';
module.exports = combineReducers({
	staff: staffReducer,
	customer: customerReducer,
	alert: alertReducer,
	connection: connectionReducer,
});