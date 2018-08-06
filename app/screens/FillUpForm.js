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
import {updateCustomerInfo} from '../actions/customerActions';

import {
	Text,
	Dimensions,
	ScrollView,
  Alert
} from 'react-native';

class FillUpForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

      firstname: null,
      lastname: null,
      contact: null,
      street: null,
      brgy: null,
      city: null,

    };

  }

  handleFirstNameChange=(text)=>{
     this.setState({
      firstname: text,
     })   
  };
  handleLastNameChange=(text)=>{
     this.setState({
      lastname: text,
     })
  };
  handleContact=(text)=>{
     this.setState({
      contact: text,
     })
  };
  handleStreet=(text)=>{
     this.setState({
      street: text,
     })
  };
  handleBrgy=(text)=>{
     this.setState({
      brgy: text,
     })
  };
  handleCity=(text)=>{
     this.setState({
      city: text,
     })
  };
  handleSubmit = (serviceid,servicename,staffid,staffname) =>{
    let servicetype="home";
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;
    let contact = this.state.contact;
    let street = this.state.street;
    let brgy = this.state.brgy;
    let city = this.state.city;
    let userid = this.props.userid;
    if(firstname && lastname && contact && street && brgy && city){
    this.props.dispatch(updateCustomerInfo(userid,serviceid,servicename,servicetype,staffid,staffname,firstname,lastname,contact,street,brgy,city));
    }
    else{
        Alert.alert(
        'Ah We really need this information.',
        'So we can provide you the greatest service',
        [
          {text: 'Okay'}
        ],
        {cancelable: false}
        );
    }
  }
  render() {
  	const {width,height} = Dimensions.get('window');
    const { serviceid,servicename,staffid,staffname } = this.props.navigation.state.params;

    return (

      <Container>
          <ScrollView>
         <Card>
      	<Card backgroundColor="teal" alignItems="center" justifyContent="center" width={width} height={100}>
      		<Text style={[styles.header],{color: '#FFFFFF',fontSize: 20}}>We hate paperworks too.</Text>
      		<Text style={[styles.header],{color: '#FFFFFF',fontSize: 15}}>Please bare with us and fill this short form.</Text>
      		<Text style={[styles.header],{color: '#FFFFFF',fontSize: 12}}>We will save this information.</Text>
      		<Text style={[styles.header],{color: '#FFFFFF',fontSize: 12}}>So next time you can just click submit.</Text>
      	</Card>
      	<Card backgroundColor="orange" alignItems="center" justifyContent="center" width={width} height={50}>
      		<Text style={[styles.header],{color: '#FFFFFF',fontSize: 12}}>We have get your location via your GPS to reduce your burden.</Text>
      	</Card>
      	<Card>
      	<Card alignItems="center" justifyContent="center" >
      		<Text>First Name</Text>
      		<Input onChangeText={this.handleFirstNameChange} width={width - 50}  alignItems="center" justifyContent="center" color="teal" height={50} borderRadius={8} borderBottomWidth={1} textAlign="center" placeholder="e.g. Juan" />
      		<Text>Last Name</Text>
      		<Input onChangeText={this.handleLastNameChange} width={width - 50}  alignItems="center" justifyContent="center" color="teal" height={50} borderRadius={8} borderBottomWidth={1} textAlign="center" placeholder="e.g. Tamad" />
      		<Text>Contact No.</Text>
      		<Input onChangeText={this.handleContact} width={width - 50}  alignItems="center" justifyContent="center" color="teal" height={50} borderRadius={8} borderBottomWidth={1} textAlign="center" placeholder="e.g. 09123456789" />
      		<Text>House No./Street</Text>
      		<Input onChangeText={this.handleStreet} width={width - 10} alignItems="center" justifyContent="center" color="teal" height={50} borderRadius={8} borderBottomWidth={1} textAlign="center" placeholder="e.g. 123 Subd. / Villa Tamad Street" />
      		<Text>Barangay</Text>
      		<Input onChangeText={this.handleBrgy} width={width - 10} alignItems="center" justifyContent="center" color="teal" height={50} borderRadius={8} borderBottomWidth={1} textAlign="center" placeholder="e.g. San Juan Tamad" />
      		<Text>City</Text>
      		<Input onChangeText={this.handleCity} width={width - 10} alignItems="center" justifyContent="center" color="teal" height={50} borderRadius={8} borderBottomWidth={1} textAlign="center" placeholder="e.g. Tobaco" />
      	</Card>
      	<Card alignItems="center" justifyContent="center">
      	<Button onPress={()=>this.handleSubmit(serviceid,servicename,staffid,staffname)} width={width-100} height={40} backgroundColor="#246C34" marginTop={10} alignItems="center" justifyContent="center" borderWidth={1} borderColor="#FFFFFF" borderRadius={8}>
      		<Text style={[styles.header,{color: '#FFFFFF'}]}>Submit</Text>
      	</Button>
      	<Button onPress={()=> null} width={width-100} height={40} backgroundColor="gray" marginTop={10} alignItems="center" justifyContent="center" borderWidth={1} borderColor="#FFFFFF" borderRadius={8}>
      		<Text style={[styles.header,{color: '#FFFFFF'}]}>Clear</Text>
      	</Button>
      	</Card>
      	</Card>
      	</Card>
      	</ScrollView>
      </Container>
     
    );
  }
}

var mapStateToProps = (state) =>{
  return{
      userid: state.customer.userid,
      username: state.customer.customerUsernameNotOnline,
  }
}

module.exports = connect(mapStateToProps)(FillUpForm);