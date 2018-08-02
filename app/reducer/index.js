import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertsReducer from './alertsReducers';
import servicesReducer from './populateServices';
import customerAuthReducer from './customerAuthReducer';
module.exports = combineReducers({
	staff: authReducer,
	customer: customerAuthReducer,
	alerts: alertsReducer,
	services:servicesReducer,
});
