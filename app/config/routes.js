import React from 'react';
import {createStackNavigator,StackActions,NavigationActions} from 'react-navigation';
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
import AdminHome from '../screens/AdminHome';
import AdminSalon from '../screens/AdminSalon';
import StaffHome from '../screens/StaffHome';
import StaffProfile from '../screens/StaffProfile';
import {populateDispatcher,populateStaff} from '../actions/PopulateDispatcher';
import {
	Image,
	Dimensions,
	Text,
	View
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
  shifting: false,
  activeTintColor: '#FFFFFF',
  inactiveTintColor: '#000000',
  barStyle: { borderRadius: 8,width:Dimensions.get('window').width-50,marginBottom: 10,justifyContent:'center',alignSelf: 'center',backgroundColor: 'green' }
});

// for staff

const bottomStaffNavigation = createMaterialBottomTabNavigator({

	StaffHome: {
		screen: StaffHome,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarColor: 'green',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/home.png')}/>

		}
	},
	Profile: {
		screen: StaffProfile,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarColor: 'green',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/profile.png')}/>

		}
	}

},{
  initialRouteName: 'StaffHome',
  shifting: false,
  activeTintColor: '#FFFFFF',
  inactiveTintColor: '#000000',
  barStyle: { borderRadius: 8,width:Dimensions.get('window').width-50,marginBottom: 10,justifyContent:'center',alignSelf: 'center',backgroundColor: 'green' }
})
const bottomAdminNavigation = createMaterialBottomTabNavigator({

	AdminHome: {
		screen: AdminHome,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarColor: 'green',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/home.png')}/>

		}
	},
	AdminSalon: {
		screen: AdminSalon,
		navigationOptions: {
			tabBarLabel: 'Salon',
			tabBarColor: 'teal',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('./icons/salon.png')}/>
		}
	}

},{
  initialRouteName: 'AdminHome',
  shifting: false,
  activeTintColor: '#FFFFFF',
  inactiveTintColor: '#000000',
  barStyle: { borderRadius: 8,width:Dimensions.get('window').width-50,marginBottom: 10,justifyContent:'center',alignSelf: 'center',backgroundColor: 'green' }


})

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
},{initialRouteName: 'Login'});



const MainNavigation = createStackNavigator({
	componentNavigation: {
		screen: componentNavigation,
		navigationOptions: {
			header: ()=>  {
				return(
						
					<View style={{width: Dimensions.get('window').width
						, height:60, backgroundColor:'#FFFFFF',
						alignItems: 'center',justifyContent: 'center',borderBottomWidth: 1,borderBottomColor: 'gray'}}>
						<Text style={{color: 'darkgreen',fontSize: 30,fontFamily: 'Oswald-Light'}}>
							JNL SALON
						</Text>
					</View>

					);
			}
		}
	},
	bottomNavigation: {
		screen: bottomNavigation,
		navigationOptions: {
			header: ()=>  {
				return(
						
					<View style={{width: Dimensions.get('window').width
						, height:60, backgroundColor:'#FFFFFF',
						alignItems: 'center',justifyContent: 'center',borderBottomWidth: 1,borderBottomColor: 'gray'}}>
						<Text style={{color: 'darkgreen',fontSize: 30,fontFamily: 'Oswald-Light'}}>
							JNL SALON
						</Text>
					</View>


					);
			}
		}
	},
	bottomAdminNavigation: {
		screen: bottomAdminNavigation,
		navigationOptions: {
			header: ()=>  {
				return(
						
					<View style={{width: Dimensions.get('window').width
						, height:60, backgroundColor:'#FFFFFF',
						alignItems: 'center',justifyContent: 'center',borderBottomWidth: 1,borderBottomColor: 'gray'}}>
						<Text style={{color: 'darkgreen',fontSize: 30,fontFamily: 'Oswald-Light'}}>
							JNL SALON
						</Text>
					</View>


					);
			}
		
		}
	},
	bottomStaffNavigation: {
		screen: bottomStaffNavigation,
		navigationOptions: {
			header: ()=>  {
				return(
						
					<View style={{width: Dimensions.get('window').width
						, height:60, backgroundColor:'#FFFFFF',
						alignItems: 'center',justifyContent: 'center',borderBottomWidth: 1,borderBottomColor: 'gray'}}>
						<Text style={{color: 'darkgreen',fontSize: 30,fontFamily: 'Oswald-Light'}}>
							JNL SALON
						</Text>
					</View>


					);
			}
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
},{initialRouteName: 'componentNavigation',navigationOptions: {
	
}})


module.exports = MainNavigation;