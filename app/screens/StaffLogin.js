'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import Pic from '../components/Pic';
import Card from '../components/Card';
import styles from './styles';

import {
	Text,
	Dimensions,
  Alert
} from 'react-native';

import {signInStaff} from '../actions/staffActions';
import {custIn,authState} from '../actions/customerActions';
import Home from './Home';
import {StackActions,NavigationActions} from 'react-navigation';



class StaffLogin extends Component {

    showAlert=(header,message)=>{
    Alert.alert(
      header,
      message,
      [{text: "Okay"}],
      {cancellable:false}
      );
  }


// COnstructor
	constructor(props) {
  	  super(props);
  	
  	  this.state = {

  	  	username: null,
  	  	password: null,
        ok: null,

  	  };

  	};



  	onSignIn = () =>{
      
      let username = this.state.username;
      let password = this.state.password;

      let message = "";
      if(!username) message="Username,";
      if(!password) message+="Password";
      if(!username || !password){
        this.showAlert("Missing",message);
      }
    
    if(username&&password)
      {this.props.dispatch(custIn(username,password));}
      
    }
    onSignInStaff = () =>{
      
      let username = this.state.username;
      let password = this.state.password;
      let message = "";
      if(!username) message="Username,";
      if(!password) message+="Password";
      if(!username || !password){
        this.showAlert("Missing",message);
      }
      
      if(username && password){
        this.props.dispatch(signInStaff(username,password));
      }
     
    }
  	handleUsernameTextChange=(text)=>{
  		this.setState({
  			username: text,

  		})
  	};
  	handlePasswordTextChange=(text)=>{
  		this.setState({
  			password: text,
  		})
  	};



    // on navigate

    navigateLocation = (dest) =>{
        const resetActions = StackActions.reset({
        index:0,
        key: null,
        actions: [
            NavigationActions.navigate({
            routeName: dest,
          }),
        ]
      });
      this.props.navigation.dispatch(resetActions);
    }
  	//render
  render() {
    let {login,auth,dispatch} = this.props;
    // if(this.props.userid){
    //  this.props.navigation.navigate('Home');
    // }
// {this.props.canbe && Alert.alert("We couldn't log you in",'Please check your credentials',[{text: 'Okay'}],{cancelable:false})}
     
     
     if(login){
       if(login==="admin"){
         this.navigateLocation("bottomAdminNavigation");
       }
       if(login==="customer"){
        this.navigateLocation("bottomNavigation");
       }
       if(login==="staff"){
        this.navigateLocation("bottomStaffNavigation");
       }
       
       
     }

     if(auth===false){
        this.showAlert("Login Failed","For some reason, please try again.");
        dispatch(authState(null)); 
     }
    
    return (
     <Container>
       <Card flex={3} alignItems="center" justifyContent="center">
					<Text>Login to access your account.</Text>
					<Input onChangeText={this.handleUsernameTextChange} marginTop={10}  value={this.state.username} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} placeholder="Username" borderRadius={8} borderColor="#246C34" textAlign="center"/>
					<Input onChangeText={this.handlePasswordTextChange} marginTop={10}  value={this.state.password} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} placeholder="Password" borderRadius={8} borderColor="#246C34" textAlign="center"/>
					<Button onPress={()=>this.onSignIn()}  backgroundColor="#246C34" alignItems="center" justifyContent="center" width={Dimensions.get('window').width-50} marginTop={10} height={50} borderWidth={1} borderRadius={8} borderColor="#246C34">
						<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Customer Login</Text>
					</Button>
          <Button onPress={()=>this.onSignInStaff()}  backgroundColor="#246C34" alignItems="center" justifyContent="center" width={Dimensions.get('window').width-50} marginTop={10} height={50} borderWidth={1} borderRadius={8} borderColor="#246C34">
            <Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Staff Login</Text>
          </Button>
					
				</Card>
				<Card flex={1}>
				</Card>
       
			</Container>
    );
  }
}

var mapStateToProps = (state) =>{
  return{
    
    login:state.alert.login,
    auth:state.alert.auth,

  }
}

module.exports = connect(mapStateToProps)(StaffLogin);
// var validate = (formProps) =>{
//   var errors = {};
//   return errors;
// }

// module.exports = reduxForm({
//   form: 'login',
//   fields: ['username','password'],
//   validate: validate,
// },null,null)(StaffLogin);