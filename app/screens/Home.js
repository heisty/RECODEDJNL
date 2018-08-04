'use strict';
// 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import Pic from '../components/Pic';
import Card from '../components/Card';
import styles from './styles';
import {getServices,getStaff} from '../actions/populateActions';
import {returnActiveServices} from '../actions/availActions';
// 

import {
  View,
  Text,
  Dimensions,
  FlatList
} from 'react-native';

class Home extends Component {


  componentWillMount(){
    // this to fill the services list
   
    this.props.dispatch(getServices());
    
    if(!this.props.usernameNotOnline){
      console.warn("You are not connected to the internet or our server.");
    }
    //to fill the casts
    //this.props.dispatch(getStaff());

  }
  componentDidMount(){
    this.props.dispatch(returnActiveServices(this.props.userid));
  }

  render() {
  	const { width,height } = Dimensions.get('window');
    const { userid,username,activeServices } = this.props;
    return(
      <Container>
      	<Card>
      		{/*Greeting*/}

      			<Card backgroundColor="teal" alignItems="center" justifyContent="center" width={width} height={100}>
      				<Text style={styles.header}>Good Day!</Text>
      				<Text style={[styles.header,{fontSize: 20,color: '#FFFFFF'}]}>{username}</Text>
      			</Card>

      		{/*End Greet*/}

      	{/*Notify customer queue*/}
      			<Card alignItems="center" justifyContent="center">
      			<Card borderRadius={8} backgroundColor="orange" alignItems="center" justifyContent="center" width={width-30} height={200}>
      				<Text style={styles.header}>Customer Queue</Text>
      				{1==0 && <Text style={[styles.header,{color: 'teal',fontSize: 20}]}>You are the 6th/20 customers.</Text>}
      				{1==1 && <Text style={[styles.header,{color: 'teal',fontSize: 20}]}>You are not in the customer queue. Please avail a service.</Text>}
      				{1==0 && <Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Time Estimate: 10 hours</Text>}
      		
      			</Card>
      			</Card>

        {/*End Notify*/}

        {/* TOP PIC*/}
        	<Card alignItems="center" justifyContent="center" width={width} height={30} backgroundColor='#246C34'>
        		<Text style={[styles.header,{fontSize: 15}]}>My Active Services</Text>
        	</Card>
          <FlatList 
          data={activeServices}
          renderItem={({item})=><Text>item._id</Text>}
          keyExtractor={(item)=> item._id}
          />


        	<Card alignItems="center" justifyContent="center" width={width} height={30}>
        		
        	</Card>


        {/**/}
      	</Card>
      </Container>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    username: state.customer.customerUsername,
    usernameNotOnline: state.customer.customerUsernameNotOnline,
    activeServices: state.services.activeServices,
  }
}

module.exports = connect(mapStateToProps)(Home);