import React from 'react';
import {createStackNavigator} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import Header from '../components/Header';
import StaffLogin from '../screens/StaffLogin';

const componentNavigation = createStackNavigator({
	Login: 
	{
		screen: WelcomeScreen,
		navigationOptions: 
		{
			header: ()=> null,
		}
	},
	StaffLogin: {
		screen: StaffLogin,
		navigationOptions: {
			header: ()=> null
		}
	}
});

module.exports = componentNavigation;