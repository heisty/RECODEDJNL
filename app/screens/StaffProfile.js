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
 Dimensions,
 Text,
 ScrollView
} from 'react-native';

class StaffProfile extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {

	  	isEdit: false

	  };
	}
  render() {
  	const {width,height} = Dimensions.get('window');
    const {username} = this.props;
  	let mode = "EDIT PROFILE";
  	let color = "red";
  	if(this.state.isEdit){
  		mode = "SAVE EDITED PROFILE"
  		color = "green";
  	}
    return (
     <Container>
     	<Card alignItems="center" justifyContent="center" borderBottomWidth={1} width={width} height={60}>
     		<Text>Profile</Text>
     	</Card>


     {/* PROFILE */}
 
 			{!this.state.isEdit &&	<Card>
    			<Card>
          		<Card alignItems="center" justifyContent="center">
          			<Card marginTop={10} borderRadius={360} width={110} height={110} borderWidth={1}>
          				{/*PROFULE PIC*/}
          			</Card>
          		</Card>
          		<Card>
          			<Card marginTop={10} flexDirection="row" alignItems= "center" justifyContent="center" width={width} height={20}>
          				<Text style={[styles.header,{color: '#000000',fontSize: 14,fontFamily: 'Oswald-Light',textAlign:'center'}]}>@ {username}</Text>
          			</Card>
          		</Card>
          	</Card>
          	<Card>
          		<Card marginTop={10} borderTopColor="green" width={width} borderTopWidth={1}>
          			{/*Motto*/}
          			<Text style={[styles.header,{color: '#000000',fontSize: 20}]}>SKILLS</Text>
          			<Text style={[styles.header,{color: '#000000',fontSize: 14}]}>JUDO,BOXING,KINGKING</Text>
     
          		</Card>
          		     <Card marginTop={10} borderTopColor="green" width={width} borderTopWidth={1}>
          			{/*Motto*/}
          			<Text style={[styles.header,{color: '#000000',fontSize: 20}]}>CONTACT</Text>
          			<Text style={[styles.header,{color: '#000000',fontSize: 14}]}>091123412 or Email at email@yahoo.com</Text>
     
          		</Card>
          		<Card marginTop={10} borderTopColor="green" width={width} borderTopWidth={1}>
          			{/*Motto*/}
          			<Text style={[styles.header,{color: '#000000',fontSize: 20}]}>ADDRESS</Text>
          			<Text style={[styles.header,{color: '#000000',fontSize: 14}]}>LEGAZPI</Text>
     
          		</Card>

     
          	</Card>
          	</Card>
          }

        
          {/*BUTTON*/}




     	<Card marginTop={10} alignItems="center" justifyContent="center">
     		<Button onPress={()=> this.setState({isEdit: !this.state.isEdit})} alignItems="center" justifyContent="center" width={width/2} height={60} borderWidth={1} backgroundColor={color} borderRadius={8}>
     			<Text style={[styles.header,{color: '#FFFFFF',fontSize: 15}]}>{mode}</Text>
     		</Button>
     	</Card>



     </Container>
    );
  }
}

let mapStateToProps = (state) =>{
  return{
    username: state.staff.username
  }
}

module.exports = connect()(StaffProfile);