
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
import {custIn,removeLoginFailed,removeCannotConnect,offlineLogin} from '../actions/customerActions';

// All Packages and Dependencies



class WelcomeScreen extends React.Component{
// I WANT TO PUT THE MAIN COMPONENTS TO LOAD HERE.... DIDMOUNT
	componentDidMount(){

		
			

	}
// I WANT TO PUT THE MAIN COMPONENTS TO LOAD HERE.... WILLMOUNT
	componentWillMount(){
		
		// I DISPATCHED THIS TO PING GOOGLE OK.

		this.props.dispatch(testConnection());
		// this.setState({
		// 	isServer: this.props.isServer,
		// 	isServerDisplayable: this.props.isServerDisplayable,
		// });
		

		
		
	}



// CONSTRUCTORS


	constructor(props) {
	  super(props);
	
	  this.state = {

	  	username: null,
	  	password: null,
	  	usernamePlaceholder: 'What is your username?',
	  	passwordPlaceholder: 'Secret Password',
	  	ret: true,
	  	isServer:null,
	  	isServerDisplayable:null

	  	
	  	

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
			this.showAlert("Please Put Your Username/Password","We need a username and password so we can provide you the best service","danger");
		}

		else{

		this.props.dispatch(custIn(this.state.username,this.state.password));
		
		}

	};

// THIS IS THE SHOWALERT IMPLEMENTATION OF FLASH MESSAGE LIBS

	showAlert = (message,description,type) =>{
		showMessage({
			message: message,
			description: description,
			type: type,
		})
	}


// RENDER FUNCTION WHERE EVERYTHING STARTS

	render(){

			let { username,offline,
				connection,connDisplay,dispatch,userid,loginfailed,message,isConnected,isDisplayable } = this.props;
			let { navigate } = this.props.navigation;
			let { isServer,isServerDisplayable } = this.state;
// A TRICK TO AVOID CLOSING THE MODALS INSIDE>>>> I WILL FIX THIS SOON

		if(userid && this.state.ret){
			navigate('Home');
			console.warn("Fuck HOme");
			this.setState({
				ret: false
			})
		    }



// THESE ARE CHECKERS OF CONNECTION
		//console.warn(isServer,isServerDisplayable);
		if(1==2/*isServer && isServerDisplayable*/){
		this.showAlert("Oh Great, You are connected to our server","You can use our application full feature because of that.","success");
		}
		else
		{
		if(isConnected && isDisplayable){
			this.showAlert("Oh Great, You have internet.","You can use our application full feature because of that.","success");
			dispatch(isConnectedChange(true,false));
		}
		if(!isConnected && isDisplayable){
			this.showAlert("Oh Bad, You have no internet.","You can still use our application but is kind of limited.","warning");
			dispatch(isConnectedChange(false,false));
		}
		}

		
		if(!connection && connDisplay){
			//this.showAlert("NO SERVER CONNECTION WHATSOEVER.","FRET NOT!. We will let you in and update you once connected.","danger");
			dispatch(offlineLogin(this.state.username,this.state.password,true));
		}

		if(loginfailed){
			this.showAlert("It seems you put a wrong password?",message,"danger");
		}
		
		dispatch(removeCannotConnect(connection));

		if(offline && this.state.ret){
			navigate('Home');
			console.warn("Fuck HOme");
			this.setState({
				ret: false
			})
		}


// RETURN FUNCTION IS WHAT CAN BE SEEN



		return(
			<Container>
				
				<Card flex={3} alignItems="center" justifyContent="center">
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
				<FlashMessage duration={5000} ref="myLocalFlashMessage" position='top' />
			</Container>

			);

	}
}

//MAP STATE TO PROPS
var mapStateToProps = (state) =>{
	return {

		userid: state.customer.userid,
		username: state.customer.username,
		offline: state.customer.offline,
		loginfailed: state.alert.loginfailed,
		message: state.alert.message,
		isConnected: state.connection.isConnected,
		isServer: state.connection.isServer,
		isServerDisplayable: state.connection.isServerDisplayable,
		isDisplayable: state.connection.isDisplayable,
		connection: state.alert.connection,
		connDisplay: state.alert.connDisplay,

		
	}
}

//  END
module.exports = connect(mapStateToProps)(WelcomeScreen);