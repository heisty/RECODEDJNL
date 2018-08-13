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
import {availService,removeAvailSuccess,saveToActiveService} from '../actions/customerActions';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
//import {staff} from '../inappData/staff';

import {
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import {getStaff} from '../actions/populateActions';

class Purchase extends Component {
  componentWillMount(){

    this.setState({
      staff: this.props.staff,
    })
  
  }

  componentDidMount(){
       this.setState({
        staff: this.props.staff,
     });

       // geo

       
  }

  constructor(props) {
    super(props);
  
    this.state = {
      selectedPersona: null,
      staffid: null,
      staff: null,
      
      
    };
  }

  handlePurchase=(staffname,id)=>{
    var { service } = this.props.navigation.state.params;
    this.setState({selectedPersona: staffname,staffid:id})

    Alert.alert(
      'Confirm Purchase',
      `${service.title} by Staff ${staffname}`,
      [
      {
        text: 'Cancel',
      },
      {
        text: 'Home Avail',   
      },
      {
        text: 'Salon Avail',onPress:()=> this.handleAvail(service._id,service.title,"salon",id,staffname),
      }
      ],
      {cancellable:false}


      );


  }

  handleAvail=(serviceId,servicename,servicetype,staffid,staffname)=>{

    // this.props.dispatch(alreadyHaveService(this.props.userid));
    // let canAvail = this.props.canAvail;
    // console.warn("THIS",canAvail);
    // if(canAvail)
    // {
  if(!this.props.availsuccess)
    {
      this.props.dispatch(availService(this.props.userid,this.props.username,serviceId,servicename,servicetype,this.state.staffid,staffname));
      this.props.dispatch(saveToActiveService(this.props.userid,this.props.username,serviceId,servicename,servicetype,this.state.staffid,staffname));
    }

    else{
       Alert.alert(
        'A service is active',
        'You cannot book while a service is active',
        [
          {text: 'Okay'}
        ],
        {cancelable: false}
        );
    }
  }

  handleAvailHome = () =>{

  }
  
  

  showAlert = (message,description,type) =>{
    showMessage({
      message: message,
      description: description,
      type: type,
    })
  }
  // render FlatList

  render() {
    //OUR FAILSAFE MUST BE ADDED OUT Set return iS AUTO 1
    var { staff,userid,availsuccess,message,isDisplay } = this.props;
  	
    var { navigate } = this.props.navigation;
  	const { width,height } = Dimensions.get('window');
    console.warn(availsuccess,isDisplay);
    if(availsuccess && isDisplay){
      //this.showAlert("Service Booked",message,"success");

      Alert.alert(
        'Service Booked!',
        'Thank you for availing this service.',
        [
          {text: 'Okay'}
        ],
        {cancelable: false}
        );

    }
    this.props.dispatch(removeAvailSuccess(availsuccess,false));

    //removed effects
    

    return (
    <ScrollView style={{backgroundColor:"#FFFFFF"}}>
      <Container>

     
      	{/*PROFILES*/}


      	
      {/*FLAT LIST OF STAFF*/}
      <Card marginTop={10} alignItems="center" justifyContent="center">
      <Card width={width-50} height={60}  borderWidth={1} alignItems="center" justifyContent="center">
        <Text>Please choose a staff.</Text>
      </Card>
      <Card width={width-50} height={170} borderRadius={5} borderWidth={1} alignItems="center" justifyContent="center">
       { <FlatList 
          data={this.props.staff}
          horizontal={true}
          renderItem={({item})=> {
            var username = item.username;
            var id = item._id;
            return(
            <Card alignItems="center" justifyContent="center">

              <Button onPress={()=> this.handlePurchase(username,id) } alignItems="center"  justifyContent="space-between" width={80} margin={10} height={80} borderRadius={360} backgroundColor="white" borderWidth={1}>
                  
              </Button>
              <Text>{item.username}</Text>
            </Card>

            

              );
          }}

          keyExtractor={(item)=> item._id}

        
          />}
         </Card>
              </Card>
            
      {/**/}
      




      	{/**/}
      {/*AVAIL*/}
       <Card marginTop={10} alignItems="center" justifyContent="center">
          <Button onPress={()=> navigate('Services')} alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
            <Text>GO BACK</Text>
          </Button>
        </Card>
      	<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Button onPress={()=>this.handleAvail(service._id,service.title,"salon",this.state.selectedPersona)} alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
      			<Text>Avail</Text>
      		</Button>
      	</Card>
      	<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Button onPress={()=> navigate('FillUpForm',{"serviceid":service._id,"servicename":service.title,"staffid":this.state.staffid,"staffname":this.state.selectedPersona})} alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
      			<Text>Avail for Home Service</Text>
      		</Button>
      	</Card>
         
        <FlashMessage duration={5000} ref="myLocalFlashMessageHome" position='top' />
      </Container>

      </ScrollView>
    );
  }
}

var mapStateToProps = (state) =>{
  return{
    staff: state.customer.staff,
    userid: state.customer.userid,
    username: state.customer.username,
    availsuccess: state.alert.availsuccess,
    message: state.alert.message,
    isDisplay: state.alert.isDisplay,
  }
}


module.exports = connect(mapStateToProps)(Purchase);