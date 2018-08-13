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
  Alert,
  ScrollView
} from 'react-native';
import {
	custUp
} from '../actions/customerActions';

class CustomerRegister extends Component {

	showAlert=(header,message)=>{
		Alert.alert(
			header,
			message,
			[{text: "Okay"}],
			{cancellable:false}
			);
	}

	onRegister=()=>{
		

		let username = this.state.username;
		let password = this.state.password;

		let message = "";

		if(!username) message="Username,";
		if(!password) message+="Password";
		if(!username || !password){
				this.showAlert("Missing",message);
			}
		if(username && password){
			this.props.dispatch(custUp(username,password));
			
		}
	}

	// onFinishRegistration=()=>{
	// 	let firstname = this.state.firstname;
	// 	let lastname = this.state.lastname;
	// 	let contact = this.state.contact;
	// 	let street = this.state.street;
	// 	let barangay = this.state.barangay;
	// 	let municipality = this.state.municipality;
	// 	let city = this.state.city;

	// 	let message = "";

	// 	if(!firstname) message="First Name,";
	// 	if(!lastname) message+="Last Name,";
	// 	if(!contact) message+="Contact,";
	// 	if(!street) message+="Street,";
	// 	if(!barangay) message+="Barangay,";
	// 	if(!municipality) message+="Municipality,";
	// 	if(!city) message+="City";

	// 	if(!firstname || !lastname || !contact || !street || !barangay || !municipality || !city){
	// 		this.showAlert("Missing",message);
	// 	}


	// }
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username: null,
	  	password: null,
	  	onOpenAdditional: false,
	  	onCloseRegister: false,


	  firstname: null,
      lastname: null,
      contact: null,
      street: null,
      brgy: null,
      municipality: null,
      city: null,
      latitude: null,
      longitude: null,

	  };
	}
  render() {
    return (
      <Container>
      <ScrollView>
    
       <Card marginTop={10} flex={3} alignItems="center" justifyContent="center">
     					<Text>Register an account.</Text>

     					<Input onChangeText={(text)=> this.setState({username: text})} marginTop={10}  value={this.state.username} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} placeholder="Username" borderRadius={8} borderColor="#246C34" textAlign="center"/>
     					<Input onChangeText={(text)=> this.setState({password: text})} marginTop={10}  value={this.state.password} width={Dimensions.get('window').width-50} height={50} color="#000000" borderWidth={1} placeholder="Password" borderRadius={8} borderColor="#246C34" textAlign="center"/>
     					<Button onPress={()=>this.onRegister()}  backgroundColor="#246C34" alignItems="center" justifyContent="center" width={Dimensions.get('window').width-50} marginTop={10} height={50} borderWidth={1} borderRadius={8} borderColor="#246C34">
     						<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Register now</Text>
     					</Button>
     					
     				</Card>

				
       </ScrollView>
			</Container>
    );
  }
}

let mapStateToProps = (state) =>{
	return{

	}
}

module.exports = connect(mapStateToProps)(CustomerRegister);