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
  getAppointment,
  getStaffTransaction,
  getStaffProfile,
  updateStaffProfile,
  deleteAvail
} from '../actions/PopulateStaff';
import {
  loginState,
  customerQueue
} from '../actions/customerActions';
import {
 Dimensions,
 Text,
 ScrollView,
 FlatList
} from 'react-native';
import {StackActions,NavigationActions} from 'react-navigation';

class StaffHome extends Component {
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.props.dispatch(getAppointment(this.props.staffid));
      this.props.dispatch(getStaffTransaction(this.props.staffid));
      this.props.dispatch(getStaffProfile(this.props.staffid));

    },3000)
    
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
  }
	constructor(props) {
	  super(props);
	
	  this.state = {

	  	isOpenAppointment: false,
	  	isOpenTransaction: false,
	  	isOpenActive: false,
      activeUser: null,
      activeService: null,
      activeType: null,
      activeDate: null,

	  };
	}

  doneService=(availid,position)=>{
    this.props.dispatch(deleteAvail(availid));
    this.props.dispatch(customerQueue(position));
  }

  logout = () =>{

      this.props.dispatch(loginState(null));
      const resetActions = StackActions.reset({
        index:0,
        key: null,
        actions: [
            NavigationActions.navigate({
            routeName: "customerAuthNavigation",
          }),
        ]
      });
      this.props.navigation.dispatch(resetActions);
    }
  render() {
  	let { width,height } = Dimensions.get('window');
  	let {records,servicename,customername,date,transaction,profile,appointment} = this.props;
   
    let type = null;
    if(this.state.activeType==="salon"){
      type="FOR SALON SERVICE";
    }
    if(this.state.activeType==="home"){
      type="FOR HOME SERVICE";
    }

    


    return (
     	
    	<Container>

    	<ScrollView>
    	<Card alignItems="center" height={60} flexDirection="row" justifyContent="space-between" borderBottomWidth={1}>
     		<Text style={[styles.header,{color: '#000000',fontSize: 15}]}>Staff Account {this.props.staffname}</Text>
         <Button onPress={()=> this.logout()} alignItems="center" justifyContent="center" width={60} borderRadius={8} height={30} backgroundColor="white" borderWidth={1}>
          <Text style={[styles.header,{color: '#000000',fontSize: 14,textAlign: 'center'}]}>Logout</Text>
        </Button>
     	</Card>
     	<Card marginTop={10} alignItems="center" justifyContent="center">
     		<Card width={width-30} height={200} borderRadius={5}  borderWidth={1}>
     		<ScrollView width={width-30}>
     	{/*APPOINTED*/}
     		<FlatList
          data={appointment}
          renderItem={({item})=> {
            let user = item.username;
            let service = item.servicename;
            let typeservice = item.servicetype;
            let date = item.date;
            return(
                <Card alignItems="center" justifyContent="center">
                <Button onPress={()=> this.setState({isOpenAppointment: !this.state.isOpenAppointment,activeUser: user,activeService:service,activeType: typeservice,activeDate:date})} alignItems="center" borderRadius={8} marginTop={10} justifyContent="center" width={width-60} height={60} backgroundColor="teal">
                <Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>{user} appointed you!</Text>
                </Button>
                </Card>
              );
          }}

          keyExtractor={(item)=>item._id}


        />

     		</ScrollView>

     		</Card>
     	</Card>

     {/*if get info*/}
     {this.state.isOpenAppointment	&&

     	<Card marginTop={10} alignItems="center" justifyContent="center">
          			<Card width={width-50} height={90} borderRadius={5}  marginTop={10}  backgroundColor="orange" padding={5}>
          				<Text style={[styles.header,{color: 'darkgreen',fontSize: 15}]}>{this.state.activeUser}</Text>
          				<Text style={[styles.header,{color: 'darkgreen',fontSize: 15}]}>{this.state.activeService}</Text>
          				<Text style={[styles.header,{color: 'darkgreen',fontSize: 15}]}>{type}</Text>
          				<Text style={[styles.header,{color: 'darkgreen',fontSize: 15}]}>{this.state.activeDate}</Text>
     
          			</Card>
          		</Card>}

{/*BUTTON*/}


		    <Card alignItems="center" justifyContent="center">
     		<Button onPress={()=> this.setState({isOpenTransaction: !this.state.isOpenTransaction})} alignItems="center" borderRadius={8} marginTop={10} justifyContent="center" width={width-60} height={60} backgroundColor="green">
     		<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>My Transactions</Text>
     		</Button>
     		</Card>



{/*MY TRANSCTIONS*/}


{this.state.isOpenTransaction &&

            <Card alignItems="center" justifyContent="center">
      		<Card marginTop={10} borderWidth={1} width={width-20} height={height-200} alignItems="center" justifyContent="center">
      		
      		<Card borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      			<Text>Service</Text>
      			<Text>Customer</Text>
      			<Text>Date</Text>
      		</Card>
      		<ScrollView style={{width: width-20}}>
      			<FlatList
      		data={transaction}
      		renderItem={({item})=>{
      		 let userid = item._id;
      		 return(
      		
      		      		<Button  onPress={()=> this.setState({userid: userid})} borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      		      			<Text>{item.servicename}</Text>
      		      			<Text>{item.username}</Text>
      		      			<Text>{item.date}</Text>
      		      		</Button>
      		
      		      			);
      		}
      		}
      		keyExtractor={(item)=> item._id}
      		/>

      		</ScrollView>
      		
      		</Card>
      		</Card>
      	}



{/* ACTIVE SERVICES */}


			<Card alignItems="center" justifyContent="center">
     		<Button onPress={()=> this.setState({isOpenActive: !this.state.isOpenActive})} alignItems="center" borderRadius={8} marginTop={10} justifyContent="center" width={width-60} height={60} backgroundColor="green">
     		<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Active Services</Text>
     		</Button>
     		</Card>

  {/* OPEN ACTIVVE SERVICES */}



     {this.state.isOpenActive && 
     			<Card marginTop={10} alignItems="center" justifyContent="center">
          		<Card width={width-30} height={200} borderRadius={5}  borderWidth={1}>
          		<ScrollView width={width-30}>
          	{/*APPOINTED*/}
          		<FlatList
              data={appointment}
              renderItem={({item})=> {
                let id = item._id;
                let pos = item.position;
                return(

                    <Card alignItems="center" justifyContent="space-between" flexDirection="row" >
                      <Text style={[styles.header,{color: '#000000',fontSize: 20,textAlign: 'center'}]}>{item.servicename}</Text>
                      <Button onPress={()=> this.doneService(id,pos)} width={90} height={60} backgroundColor="green" alignItems="center" justifyContent="center"><Text style={[styles.header,{color: '#FFFFFF',fontSize: 16}]}>Set Done</Text></Button>
                      </Card>

                  );
              }}
              keyExtractor={(item)=> item._id}
              />
     
          		</ScrollView>
     
          		</Card>
          	</Card>
     }




      	</ScrollView>
    	</Container>

    );
  }
}

let mapStateToProps = (state) =>{
	return{
    appointment: state.staff.appointment,
    transaction: state.staff.transaction,
    profile: state.staff.profile,
    staffid: state.staff.staffid,
    staffname: state.staff.staffname,
	}
}

module.exports = connect(mapStateToProps)(StaffHome);