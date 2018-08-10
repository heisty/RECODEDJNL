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
import {deleteByCustomerId,deleteStaff,registerStaff,addService,updateService,deleteService} from '../actions/staffActions';

import {
  Dimensions,
  Text,
  ScrollView,
  FlatList
} from 'react-native';

class AdminSalon extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isDisplayEmployee: false,
	  	isDisplayUser: false,
	  	isDisplayServices: false,
	  	isAddStaff: false,
	  	isAddService: false,
	  	isEditService: false,
	  	staffid: null,
	  	userid: null,
	  	serviceid: null,
	  	serviceTitle: null,
	  	username: null,
	  	password: null,
	  	servicename: null,
	  	servicedescription: null,
	  	serrviceprice: null,

	  };
	}

	deleteById=()=>{
		let staffid = this.state.staffid;
		this.props.dispatch(deleteStaff(staffid));
	}

	registerStaff=()=>{
		let username = this.state.username;
		let password = this.state.password;

		this.props.dispatch(registerStaff(username,password));
	}
	deleteByCustomerId=()=>{
		let userid = this.state.userid;
		this.props.dispatch(deleteByCustomerId(userid));
	}
	registerService=()=>{
		let serviceid = this.state.serviceid;
		let title = this.state.servicename;
		let description = this.state.servicedescription;
		let price = this.state.serviceprice;

		if(this.state.isAddService){
			this.props.dispatch(addService(title,description,price));
		}
		if(this.state.isEditService){
			this.props.dispatch(updateService(serviceid,title,description,price));
		}

	}

	deleteService=()=>{
		let serviceid = this.state.serviceid;
		this.props.dispatch(deleteService(serviceid));

	}
  render() {
  	const { width,height } = Dimensions.get('window');
  	let {staff,customer,services} = this.props;

  	let mode = "Register Service";
  	let modeTitle = "Add Service : ";
  	if(this.state.isEditService){
  		mode="Edit Service";
  		modeTitle="Editing Service : "
  	}

  	


    return (
      <Container>
      <ScrollView>
      	<Card alignItems="center" justifyContent="center">
      	<Button onPress={(text)=> this.setState({isDisplayEmployee: !this.state.isDisplayEmployee,isAddStaff: false})} alignItems="center" justifyContent="center" width={width-40} marginTop={10} borderRadius={8} height={60} backgroundColor="teal">
      		<Text style={[styles.header,{color: '#FFFFFF',fontSize: 25,textAlign: 'center'}]}>Employees</Text>
      	</Button>
      	</Card>

      	{this.state.isDisplayEmployee && 

      		<Card alignItems="center" justifyContent="center">
      		<Card marginTop={10} borderWidth={1} width={width-20} height={height-200} alignItems="center" justifyContent="center">
      		
      		<Card borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      			<Text>Staff Name</Text>
      			<Text>{this.state.staffid}</Text>
      		</Card>
      		<ScrollView style={{width: width-20}}>

      		<FlatList
      		data={staff}
      		renderItem={({item})=>{
      			let staffid = item._id;
      		 return(
      					
      		      		<Button onPress={()=> this.setState({staffid: staffid})} borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      		      			<Text>{item.username}</Text>
      		      		</Button>
      		
      		      			);
      		}
      		}
      		keyExtractor={(item)=> item._id}
      		/>




      		</ScrollView>
      		
      		</Card>

      		<Card flexDirection="row" justifyContent="space-between" width={width-50}>
      		<Button onPress={(text)=> this.setState({isAddStaff: !this.state.isAddStaff,isDisplayEmployee: !this.state.isDisplayEmployee})} width={width/3} height={50} alignItems="center" justifyContent="center"  backgroundColor="green" borderRadius={4}>
      			<Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>Add Staff</Text>
      		</Button>
      		<Button onPress={()=> this.deleteById()} width={width/3} height={50} alignItems="center" justifyContent="center"  backgroundColor="red" borderRadius={4}>
      			<Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>Delete Staff</Text>
      		</Button>
      		</Card>
      		</Card>

      	}


      {/*case add staff*/}

      {this.state.isAddStaff && 

      	<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Input onChangeText={(text)=> this.setState({username:text})} marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder="Staff Username" borderWidth={1}
      			borderRadius={5}
      		/>
      		<Input onChangeText={(text)=> this.setState({password:text})} marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder="Staff Password" borderWidth={1}
      			borderRadius={5}
      		/>
      		<Button onPress={()=> this.registerStaff()} alignItems="center" justifyContent="center" marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder backgroundColor="green" borderWidth={1}
      			borderRadius={5}>
      			<Text style={{textAlign: 'center',color: '#FFFFFF'}}>Register Staff</Text>
      		</Button>
      	</Card>

      }



      {/*USERS*/}
      	<Card alignItems="center" justifyContent="center">

      	<Button onPress={(text)=> this.setState({isDisplayUser: !this.state.isDisplayUser})} alignItems="center" justifyContent="center" width={width-40} marginTop={10} borderRadius={8} height={60} backgroundColor="teal">
      		<Text style={[styles.header,{color: '#FFFFFF',fontSize: 25,textAlign: 'center'}]}>Users</Text>
      	</Button>
      	</Card>

      	{this.state.isDisplayUser && 

      		<Card alignItems="center" justifyContent="center">
      		<Card marginTop={10} borderWidth={1} width={width-20} height={height-200} alignItems="center" justifyContent="center">
      		
      		<Card borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      			<Text>Users Name {this.state.userid}</Text>
      		</Card>
      		<ScrollView style={{width: width-20}}>

      		<FlatList
      		data={customer}
      		renderItem={({item})=>{
      		 let userid = item._id;
      		 return(
      		
      		      		<Button  onPress={()=> this.setState({userid: userid})}  borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      		      			<Text>{item.username}</Text>
      		      		</Button>
      		
      		      			);
      		}
      		}
      		keyExtractor={(item)=> item._id}
      		/>


      		</ScrollView>
      		
      		</Card>
                  <Button onPress={()=> this.deleteByCustomerId()} width={width/2} height={50} alignItems="center" justifyContent="center"  backgroundColor="red" borderRadius={4}>
                        <Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>View User</Text>
                  </Button>
      		<Button onPress={()=> this.deleteByCustomerId()} width={width/2} height={50} alignItems="center" justifyContent="center"  backgroundColor="red" borderRadius={4}>
      			<Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>Delete User</Text>
      		</Button>
      		</Card>
      	}

      {/*SERVICES*/}
      	<Card alignItems="center" justifyContent="center">
      	<Button onPress={(text)=> this.setState({isDisplayServices: !this.state.isDisplayServices,isAddService:false,isEditService:false})} alignItems="center" justifyContent="center" width={width-40} marginTop={10} borderRadius={8} height={60} backgroundColor="teal">
      		<Text style={[styles.header,{color: '#FFFFFF',fontSize: 25,textAlign: 'center'}]}>Services</Text>
      	</Button>
      	</Card>

      	  {this.state.isDisplayServices && 

      	  	<Card alignItems="center" justifyContent="center">
      		<Card marginTop={10} borderWidth={1} width={width-20} height={height-200} alignItems="center" justifyContent="center">
      		
      		<Card borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      			<Text>Service Name {this.state.serviceid}</Text>
      		</Card>
      		<ScrollView style={{width: width-20}}>
      		<FlatList
      		data={services}
      		renderItem={({item})=>{
      		let serviceid = item._id;
      		let servicename = item.title;
      		let servicedescription = item.description;
      		let serviceprice = item.price;
      		try{
      		serviceprice=serviceprice.toString();
      			}
      			catch(error){
      				serviceprice=null
      			}
      		 return(
      		
      		      		<Button onPress={()=> this.setState({serviceid: serviceid,servicename: servicename,servicedescription:servicedescription,serviceprice:serviceprice})} borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      		      			<Text>{item.title} --- {item.price}</Text>
      		      		</Button>
      		
      		      			);
      		}
      		}
      		keyExtractor={(item)=> item._id}
      		/>
      		</ScrollView>
      		
      		</Card>
      		<Card flexDirection="row" justifyContent="space-between" width={width-50}>
      		<Button onPress={()=> this.setState({isAddService: !this.state.isAddService,isDisplayServices: !this.state.isDisplayServices,isEditService: false})} width={width/4} height={50} alignItems="center" justifyContent="center"  backgroundColor="green" borderRadius={4}>
      			<Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>Add Service</Text>
      		</Button>
      		<Button onPress={()=> this.deleteService()} width={width/4} height={50} alignItems="center" justifyContent="center"  backgroundColor="red" borderRadius={4}>
      			<Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>Delete Service</Text>
      		</Button>
      		<Button onPress={()=> this.setState({isEditService: !this.state.isEditService,isDisplayServices: !this.state.isDisplayServices,isAddService: false})} width={width/4} height={50} alignItems="center" justifyContent="center"  backgroundColor="orange" borderRadius={4}>
      			<Text style={{textAlign: 'center',fontSize: 20,color: '#FFFFFF'}}>Edit Service</Text>
      		</Button>
      		</Card>
      		</Card>


      	  }

      	  {(this.state.isAddService || this.state.isEditService) && 

      	  	<Card marginTop={10} alignItems="center" justifyContent="center">
      	  	<Text>{modeTitle}{this.state.servicename}</Text>
      		<Input onChangeText={(text)=> this.setState({servicename:text})} value={this.state.servicename} marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder="Service Title" borderWidth={1}
      			borderRadius={5}
      		/>
      		<Input onChangeText={(text)=> this.setState({servicedescription:text})} value={this.state.servicedescription}  marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder="Description" borderWidth={1}
      			borderRadius={5}
      		/>
      		<Input onChangeText={(text)=> this.setState({serviceprice:text})} value={this.state.serviceprice}  marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder="Price" borderWidth={1}
      			borderRadius={5}
      		/>
      		<Button onPress={()=> this.registerService()} alignItems="center" justifyContent="center" marginTop={10} textAlign="center" color="#000000" width={width-30} height={50} placeholder backgroundColor="green" borderWidth={1}
      			borderRadius={5}>
      			<Text style={{textAlign: 'center',color: '#FFFFFF'}}>{mode}</Text>
      		</Button>
      	</Card>
      	  }

      	  </ScrollView>
      </Container>

    
    );
  }
}

let mapStateToProps = (state) =>{
	return{
		staff: state.customer.staff,
		services: state.customer.services,
		customer: state.customer.customer,
	}
}


module.exports = connect(mapStateToProps)(AdminSalon);