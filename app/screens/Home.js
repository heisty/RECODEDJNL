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
import {popAction} from '../config/routes';
import {populateDispatcher,populateStaff} from '../actions/PopulateDispatcher';
import {
  positionActive,
  removeCannotConnect,
  removeSign,
  removeOfflineDisplay,
  offlineLogin,
  customerActive,
  offlineLoginReset,
  returnActive,
  customerQueue,
  unloggedUser
} from '../actions/customerActions';
import {testServerConnection} from '../actions/connectionActions';
import {deleteAvail} from '../actions/PopulateStaff';
import {custIn} from '../actions/customerActions';
import {StackActions,NavigationActions} from 'react-navigation';
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
      counter: 0,
      interval: 3000,
      availid: null
    };
  }
  componentWillMount(){
    

   
  }
  componentDidMount(){

    if(this.props.offlineDisplay){

    }

    this.timer = setInterval(()=>{
    this.props.dispatch(populateDispatcher());
    this.props.dispatch(populateStaff());
    this.props.dispatch(positionActive(this.props.userid));
    this.props.dispatch(testServerConnection());
    this.props.dispatch(customerActive());
    this.props.dispatch(returnActive(this.props.userid));

    },3000)

   
   
     
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
    console.warn("UNMOUNTED");
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

 handleCancel = (availid) =>{
  this.props.dispatch(deleteAvail(availid));
  let position = this.props.position;
  this.props.dispatch(customerQueue(position));
 }


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

  logout = () =>{
      this.props.dispatch(unloggedUser());
      const resetActions = StackActions.reset({
        index:0,
        key: null,
        actions: [
            NavigationActions.navigate({
            routeName: "componentNavigation",
          }),
        ]
      });
      this.props.navigation.dispatch(resetActions);
    }

  render(){

    console.warn(this.props.userid);
   
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
      activeservice,
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

    if(offline){
       dispatch(custIn(username,password));
    }
    console.warn("OFFLINED",offlineDisplay,this.props.password)

    if(relogin){
      console.warn("RELOGIN");

      this.navigateStack("componentNavigation");
        
    }


    if(sign && signDisplay){
         Alert.alert(
        'ACCOUNT CREATED!',
        'We detected that you are a new one so we took the liberty to create account for you.',
        [
          {text: 'Okay'}
        ],
        {cancelable: false}
        );
      this.props.dispatch(removeSign(sign));
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

      			<Card alignItems="center" height={60} flexDirection="row" justifyContent="space-between" borderBottomWidth={1}>
        <Text style={[styles.header,{color: '#000000',fontSize: 15}]}>Customer Account {this.props.username}</Text>
         <Button onPress={()=> this.logout()} alignItems="center" justifyContent="center" width={60} borderRadius={8} height={30} backgroundColor="white" borderWidth={1}>
          <Text style={[styles.header,{color: '#000000',fontSize: 14,textAlign: 'center'}]}>Logout</Text>
        </Button>
      </Card>

      		{/*End Greet*/}

      	{/*Notify customer queue*/}
      			<Card marginTop={10} alignItems="center" justifyContent="center">
      			<Card borderRadius={5} borderWidth={1} backgroundColor="teal" alignItems="center" justifyContent="center" width={width-30} height={200}>
      				<Text style={[styles.header,{color: 'white'}]}>Customer Queue</Text>
      				{position && position!==0 && <Text style={[styles.header,{color: 'white',fontSize: 20}]}>You are the {position}{postfix}/{total} customers.</Text>}
      				{(!position || position===0) && <Text style={[styles.header,{color: 'white',fontSize: 20}]}>You are not in the customer queue. Please avail a service.</Text>}
      				{position && <Text style={[styles.header,{color: 'white',fontSize: 20}]}>Time Estimate: {this.state.counter} hours</Text>}
      		
      			</Card>
      			</Card>

        {/*End Notify*/}

        {/* TOP PIC*/}
        	<Card marginTop={10} alignItems="center" justifyContent="center" width={width} height={30} backgroundColor='white' borderWidth={1}>
        		<Text style={[styles.header,{fontSize: 15,color: '#000000'}]}>My Active Services</Text>
        	</Card>
          <FlatList 
          data={activeservice}
          renderItem={({item})=>{
            let availid = item._id;
            return(
                    <Card marginTop={10} alignItems="center" justifyContent="center">
                    <Card flexDirection="row" width={width-30} height={60} borderRadius={8} borderWidth={1} alignItems="center" justifyContent="space-between">
                        <Text style={[styles.header,{color:'#000000',fontSize:18,textAlign:'center'}]}>
                            {item.servicename}
                        </Text>
                        <Button onPress={()=> this.handleCancel(availid)} width={80} height={40} borderRadius={6} backgroundColor="red">
                            <Text style={[styles.header,{color:'#FFFFFF',fontSize:18,textAlign:'center'}]}>Cancel Order</Text>
                        </Button>
                    </Card>
                    </Card>

              );
          }}
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
   total: state.customer.total,
   activeservice: state.customer.activeservice,
  
    
  }
}

module.exports = connect(mapStateToProps)(Home);