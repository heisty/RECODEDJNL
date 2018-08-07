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
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import {populateDispatcher,populateStaff} from '../actions/PopulateDispatcher';
import {
  positionActive,
  removeCannotConnect,
  removeSign,
  removeOfflineDisplay,
  offlineLogin,
  customerActive,
  offlineLoginReset
} from '../actions/customerActions';
import {testServerConnection} from '../actions/connectionActions';
import {custIn} from '../actions/customerActions';
// 

import {
  View,
  Text,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';

class Home extends Component {

// COMPONENT WILL MOUNT
  constructor(props) {
    super(props);
  
    this.state = {
      counter: 0
    };
  }
  componentWillMount(){
    

   
  }
  componentDidMount(){
    setInterval(()=>{
    this.props.dispatch(populateDispatcher());
    this.props.dispatch(populateStaff());
    this.props.dispatch(positionActive(this.props.userid));
    this.props.dispatch(testServerConnection());
    this.props.dispatch(customerActive());
    },3000)
     
  }

  handleTab = () =>{
    console.warn("Clickked");
  }
 // RENDER

 showAlert=(message,description,type)=>{
    showMessage({
      message: message,
      decription: description,
      type: type
    })
 }

  render(){
   
  	const { width,height } = Dimensions.get('window');
    const { 
      relogin,
      sign,
      signDisplay,
      dispatch,
      displayOffline,
      offlineDisplay,
      offline,
      userid,
      username,
      password,
      activeServices,
      position,
      total 
    } = this.props;
    console.warn(offlineDisplay);

    let status = null;
    if(!this.props.serverconnection){
      status="Offline";
    }
    else{
      status="Online";
    }
     // if(offline && displayOffline){
     //  //this.showAlert("NO SERVER CONNECTION WHATSOEVER.","But don't worry, you can still use our app.","warning");
     //   Alert.alert(
     //    'NO SERVER CONNECTION',
     //    'We will update you when the connection is back.But for now you are free to use the app but limited features.',
     //    [
     //      {text: 'Okay'}
     //    ],
     //    {cancelable: false}
     //    );
     //  console.warn("EXE");
       
     
     //    }

    if(offlineDisplay){
       dispatch(custIn(username,password));
    }

    if(relogin){
      console.warn("RELOGIN");
    }

    let postfix = null;
    if(position===1){
      postfix="st";
    }
    if(position===2){
      postfix="nd";
    }
    if(position===3){
      postfix="rd";
    }
    if(position>3&&position<10){
      postfix="th";
    }

     
    return(
      <Container>
      	<Card>
      		{/*Greeting*/}

      			<Card backgroundColor="teal" alignItems="center" justifyContent="center" width={width} height={100}>
      				<Text style={styles.header}>Good Day!</Text>
      				<Text style={[styles.header,{fontSize: 20,color: '#FFFFFF'}]}>{username}@{status}</Text>
      			</Card>

      		{/*End Greet*/}

      	{/*Notify customer queue*/}
      			<Card alignItems="center" justifyContent="center">
      			<Card borderRadius={8} backgroundColor="orange" alignItems="center" justifyContent="center" width={width-30} height={200}>
      				<Text style={styles.header}>Customer Queue</Text>
      				{position && position!==0 && <Text style={[styles.header,{color: 'teal',fontSize: 20}]}>You are the {position}{postfix}/{total} customers.</Text>}
      				{(!position || position===0) && <Text style={[styles.header,{color: 'teal',fontSize: 20}]}>You are not in the customer queue. Please avail a service.</Text>}
      				{position && <Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Time Estimate: {this.state.counter} hours</Text>}
      		
      			</Card>
      			</Card>

        {/*End Notify*/}

        {/* TOP PIC*/}
        	<Card alignItems="center" justifyContent="center" width={width} height={30} backgroundColor='#246C34'>
        		<Text style={[styles.header,{fontSize: 15}]}>My Active Services</Text>
        	</Card>
          <FlatList 
          data={activeServices}
          renderItem={({item})=><Text>{item.servicename}</Text>}
          keyExtractor={(item)=> item._id}
          />


        	<Card alignItems="center" justifyContent="center" width={width} height={30}>
        		
        	</Card>


        {/**/}
      	</Card>
        <FlashMessage duration={5000} ref="myLocalFlashMessage" position='top' />
      </Container>
    );
  }
}

var mapStateToProps = (state) => {
  return {
   
   userid: state.customer.userid,
   username: state.customer.username,
   password: state.customer.password,
   position: state.customer.position,
   offline: state.customer.offline,
   relogin: state.alert.relogin,
   sign: state.alert.sign,
   signDisplay: state.alert.signDisplay,
   serverconnection: state.alert.serverconnection,
   offlineDisplay: state.alert.offlineDisplay,
   displayOffline: state.customer.displayOffline,
   total: state.customer.total
  
    
  }
}

module.exports = connect(mapStateToProps)(Home);