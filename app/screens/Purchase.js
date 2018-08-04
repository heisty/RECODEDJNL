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
import {availServices,availServiceDelete,alreadyHaveService} from '../actions/availActions';
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
  constructor(props) {
    super(props);
  
    this.state = {
      selectedPersona: null,
      staffid: null,
    };
  }

  handleAvail=(serviceId,title)=>{

    this.props.dispatch(alreadyHaveService(this.props.userid));
    let canAvail = this.props.canAvail;
    if(canAvail)
    {
    let servicetype="home";
    this.props.dispatch(availServices(this.props.userid,serviceId,servicetype,this.state.staffid,title));
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
  
  componentDidMount(){
     this.props.dispatch(getStaff());
  }
  // render FlatList

  render() {
    //OUR FAILSAFE MUST BE ADDED OUT Set return iS AUTO 1

    var { staff,userid,availState } = this.props;
  	var { service } = this.props.navigation.state.params;
    var { navigate } = this.props.navigation;
  	const { width,height } = Dimensions.get('window');

    if(availState===1){
      Alert.alert(
        'Service Booked!',
        'Okay, thats great. Your service is underway.',
        [
          {text: 'Okay'}
        ],
        {cancelable: false}
        );

      this.props.dispatch(availServiceDelete());
    }
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
          data={staff}
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
      		<Button onPress={()=>this.handleAvail(service._id,service.title)} alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
      			<Text>Avail</Text>
      		</Button>
      	</Card>
      	<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Button onPress={()=> navigate('FillUpForm')} alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
      			<Text>Avail for Home Service</Text>
      		</Button>
      	</Card>
         

      </Container>
      </ScrollView>
    );
  }
}

var mapStateToProps = (state) =>{
  return{
    staff: state.services.staff,
    services: state.services.services,
    userid: state.customer.customerId,
    availState: state.alerts.availState,
    canAvail: state.alerts.canAvail
  }
}


module.exports = connect(mapStateToProps)(Purchase);