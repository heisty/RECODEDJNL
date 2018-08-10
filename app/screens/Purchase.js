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

  handleAvail=(serviceId,servicename,servicetype,staffname)=>{

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
  	var { service } = this.props.navigation.state.params;
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

      <Card width={width} height={240} backgroundColor="#246C34">

      	<Card alignItems="center" justifyContent="center" backgroundColor="teal" width={width} height={200}>

      				
      			<Text style={[styles.header],{color: 'white',fontSize: 25}}>{service.title}</Text>	
      			<Card marginTop={20} width={width-20}>
      			<Text style={[styles.header],{color: 'white',fontSize: 15}}>{service.description}</Text>
      	</Card></Card>
      	<Text style={[styles.header,{color: '#FFFFFF',fontSize: 18,fontWeight: 'bold'}]}>PRICE: PHP{service.price}</Text>
      	</Card>
      	{/*PROFILES*/}


      	<Card justifyContent="center" width={width} height={180} backgroundColor="#246C34">
      	 <Text style={[styles.header,{color: '#FFFFFF',fontSize: 15}]}>Swap Left to Right</Text>
        <Card width={width} height={100}  backgroundColor="white" justifyContent="center">
      {/*FLAT LIST OF STAFF*/}
      
        <FlatList 
          data={this.props.staff}
          horizontal={true}
          renderItem={({item})=> {
            var username = item.username;
            var id = item._id;
            return(
             
              <Button onPress={()=> this.setState({selectedPersona: username,staffid:id}) } alignItems="center"  justifyContent="space-between" width={80} margin={10} height={80} borderRadius={360} backgroundColor="gray">
                  <Text>{item.username}</Text>
              </Button>
            

              );
          }}

          keyExtractor={(item)=> item._id}

        
          />
            
      {/**/}
      	</Card>
      	<Text style={[styles.header,{color: '#FFFFFF',fontSize: 15}]}>Please choose your desired massager or employee.</Text>
        {this.state.selectedPersona && <Text style={[styles.header,{color: '#FFFFFF',fontSize: 25}]}>You chose {this.state.selectedPersona}</Text>}
      	</Card>




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