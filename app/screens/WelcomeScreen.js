
// ALL PACKAGES ADDED HERE
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import Pic from '../components/Pic';
import Card from '../components/Card';
import styles from './styles';
import {loginCustomerUser,customerLoginFailed} from '../actions/authActions';
import {testConnection,isConnectedChange} from '../actions/connectionActions';
import {
	Text,
	Dimensions,
	Alert,
	BackHandler
} from 'react-native';
import Main from './Main';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import {
	custIn,
	removeLoginFailed,
	removeCannotConnect,
	offlineLogin,
	reloginSet
} from '../actions/customerActions';
import {StackActions,NavigationActions} from 'react-navigation';

// All Packages and Dependencies



class WelcomeScreen extends React.Component{
// I WANT TO PUT THE MAIN COMPONENTS TO LOAD HERE.... DIDMOUNT
	componentDidMount(){

		
			

	}
// I WANT TO PUT THE MAIN COMPONENTS TO LOAD HERE.... WILLMOUNT






// CONSTRUCTORS


	constructor(props) {
	  super(props);
	
	  this.state = {

	  	username: null,
	  	password: null,
	  	usernamePlaceholder: 'What is your username?',
	  	passwordPlaceholder: 'Secret Password',
	  	isSubmit: false,
	  	

	  	
	  	

	  };
	}


// HANDLE USERNAME

	handleUsernameChange=(text)=>{
		this.setState({
			username: text,
		})
		
	};


// HANDLE PASSWORDS

	handlePasswordChange=(text)=>{
		this.setState({
			password: text,
		})
		
	};


// THIS WILL WORK WHEN SUBMITTED> THIS IS SUBMIT BUTTON



	nameSubmit=()=>{
		if(this.state.username===null||this.state.password===null){
			Alert.alert(
        	'Put some info.',
        	"If you are new , don't worry we will automatically create your account.",
        	[
        	  {text: 'Okay'}
       		 ],
        	{cancelable: false}
        	);
		}

		else{

		this.props.dispatch(custIn(this.state.username,this.state.password));
		this.setState({isSubmit: true})
		
		}

	};

// THIS IS THE SHOWALERT IMPLEMENTATION OF FLASH MESSAGE LIBS

	navigateStack = (route) =>{
		const resetActions = StackActions.reset({
				index:0,
				key: null,
				actions: [
						NavigationActions.navigate({
						routeName: route,
					}),
				]
			});
			this.props.navigation.dispatch(resetActions);
	}



// RENDER FUNCTION WHERE EVERYTHING STARTS

	render(){

		const {
			userid,
			offline,
			relogin,
			message,
		} = this.props;

		const {
			navigate
		} = this.props.navigation;


		if(userid){
			console.warn("IS_LOGGED_IN");
			this.navigateStack("bottomNavigation");
			

				
		}
		if(offline && offline!==undefined && this.state.isSubmit){
			console.warn("Offline",offline);
			Alert.alert(
        	'OFFLINE LOGIN',
        	"Once connected we will check your account and update you.",
        	[
        	  {text: 'Okay'}
       		 ],
        	{cancelable: false}
        	);
			this.setState({isSubmit: true})
        	this.props.dispatch(offlineLogin(this.state.username,this.state.password));
        	this.navigateStack("bottomNavigation");


		}

		if(relogin && relogin!==undefined){
			console.warn("Login Failed");

			Alert.alert(
        	'LOGIN FAILED',
        	message,
        	[
        	  {text: 'Okay'}
       		 ],
        	{cancelable: false}
        	);
        	this.props.dispatch(reloginSet());

		}

// RETURN FUNCTION IS WHAT CAN BE SEEN



		return(
			<Container>
				
				<Card flex={6} flexDirection="column" alignItems="center" justifyContent="center">
					<Text>Hello there. Tell us your name.</Text>
				{/*INPUT*/}
					<Input onChangeText={this.handleUsernameChange} value={this.state.username} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} borderRadius={8} borderColor="#246C34" placeholder={this.state.usernamePlaceholder} textAlign="center"/>
					<Input marginTop={10} onChangeText={this.handlePasswordChange} value={this.state.password} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} borderRadius={8} borderColor="#246C34" placeholder={this.state.passwordPlaceholder} textAlign="center"/>
					<Button onPress={()=>this.nameSubmit()} backgroundColor="#246C34" alignItems="center" justifyContent="center" width={Dimensions.get('window').width-50} marginTop={10} height={50} borderWidth={1} borderRadius={8} borderColor="#246C34">
						<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Customer Login</Text>
					</Button>
					<Button onPress={()=>navigate('StaffLogin')} backgroundColor="#246C34" alignItems="center" justifyContent="center" width={Dimensions.get('window').width-50} marginTop={10} height={50} borderWidth={1} borderRadius={8} borderColor="#246C34">
						<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Staff Login</Text>
					</Button>
					
				</Card>
				<Card flex={1}>
				</Card>
			</Container>

			);

	}
}

//MAP STATE TO PROPS
var mapStateToProps = (state) =>{
	return {

		userid: state.customer.userid,
		offline: state.customer.offline,
		loginfailed: state.alert.loginfailed,
		relogin: state.alert.relogin,	
		message: state.alert.message,
	}
}

//  END
module.exports = connect(mapStateToProps)(WelcomeScreen);