import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import Header from '../components/Header';
import StaffLogin from '../screens/StaffLogin';
import Home from '../screens/Home';
import Services from '../screens/Services';
import Crew from '../screens/Crew';
import Feedback from '../screens/Feedback';
import Purchase from '../screens/Purchase';
import FillUpForm from '../screens/FillUpForm';
import {connect} from 'react-redux';
import {
	Image,
	Dimensions
} from 'react-native';

const bottomNavigation = createMaterialBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarColor: 'green',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/home.png')}/>
		}
	},
	Services: {
		screen: Services,
		navigationOptions: {
			tabBarLabel: 'Services',
			tabBarColor: 'teal',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/salon.png')}/>
		}
	},
	Crew: {
		screen: Crew,
		navigationOptions: {
			tabBarLabel: 'Crew',
			tabBarColor: 'purple',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/crew.png')}/>
		}
	},
	Feedback: {
		screen: Feedback,
		navigationOptions: {
			tabBarLabel: 'Feedback',
			tabBarColor: 'darkred',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/feedback.png')}/>
		}
	}
},{
  initialRouteName: 'Home',
  shifting: true,
  activeTintColor: '#FFFFFF',
  inactiveTintColor: '#FFFFFF',
  barStyle: { backgroundColor: 'gray',width: Dimensions.get('window').width,height: Dimensions.get('window').width/5,alignItems: 'center',justifyContent:'center',padding: 28 }
});

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



const MainNavigation = createStackNavigator({
	componentNavigation: {
		screen: componentNavigation,
		navigationOptions: {
			header: ()=> null
		}
	},
	bottomNavigation: {
		screen: bottomNavigation,
		navigationOptions: {
			header: ()=> null
		}
	},
	Modal: {
		screen: Purchase,
		navigationOptions: {
			header: ()=> null
		}
	},
	FillUpForm: {
		screen: FillUpForm,
		navigationOptions: {
			header: ()=> null
		}
	}
},{initialRouteName: 'componentNavigation'})

module.exports = MainNavigation;