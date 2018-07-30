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

import {loginUser} from '../actions/authActions';
import Main from './Main';



class StaffLogin extends Component {


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
      this.props.dispatch(loginUser(this.state.username,this.state.password));

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
  	//render
  render() {
    if(this.props.user_id){
      return(
          <Main />
        );
    }
// {this.props.canbe && Alert.alert("We couldn't log you in",'Please check your credentials',[{text: 'Okay'}],{cancelable:false})}
        
    
    return (
     <Container>
       <Card flex={3} alignItems="center" justifyContent="center">
					<Text>{this.props.text}</Text>
					<Input onChangeText={this.handleUsernameTextChange} marginTop={10}  value={this.state.username} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} placeholder="Username" borderRadius={8} borderColor="#246C34" textAlign="center"/>
					<Input onChangeText={this.handlePasswordTextChange} marginTop={10}  value={this.state.password} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} placeholder="Password" borderRadius={8} borderColor="#246C34" textAlign="center"/>
					<Button onPress={this.onSignIn}  backgroundColor="#246C34" alignItems="center" justifyContent="center" width={Dimensions.get('window').width-50} marginTop={10} height={50} borderWidth={1} borderRadius={8} borderColor="#246C34">
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
    user_id: state.auth.user_id,
    text: state.alerts.alert,
    canbe: state.alerts.canbe,
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