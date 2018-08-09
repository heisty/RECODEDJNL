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
  ScrollView,
  FlatList
} from 'react-native';
import {populateDispatcher,populateCustomer,populateStaff} from '../actions/PopulateDispatcher';
import {getRecords} from '../actions/PopulateDispatcher';
import {StackActions,NavigationActions} from 'react-navigation';
class AdminHome extends Component {
	componentDidMount(){
		setInterval(()=>{
			this.props.dispatch(populateDispatcher());
			this.props.dispatch(populateStaff());
			this.props.dispatch(populateCustomer());
			this.props.dispatch(getRecords());
		},3000)
	}
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isTransaction: false,
	  };
	}

  logout = () =>{
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
  render() {
  	const { width,height } = Dimensions.get('window');
  	const {records} = this.props;
    return (
      <Container>
      <ScrollView>
      	<Card width={width} alignItems="center" justifyContent="space-between" flexDirection="row" height={50} backgroundColor="white" borderWidth={1}>
      		<Text style={[styles.header,{color: '#000000',fontSize: 14,textAlign: 'center'}]}>ADMINISTRATOR ACCOUNT</Text>
      	 <Button onPress={()=> this.logout()} alignItems="center" justifyContent="center" width={60} borderRadius={8} height={30} backgroundColor="white" borderWidth={1}>
          <Text style={[styles.header,{color: '#000000',fontSize: 14,textAlign: 'center'}]}>Logout</Text>
        </Button>
        </Card>
      	<Card alignItems="center" justifyContent="center">
      	<Button onPress={(text)=> this.setState({ isTransaction: !this.state.isTransaction })} alignItems="center" justifyContent="center" width={width-40} marginTop={10} borderRadius={8} height={60} backgroundColor="teal">
      		<Text style={[styles.header,{color: '#FFFFFF',fontSize: 25,textAlign: 'center'}]}>Transactions</Text>
      	</Button>
      	</Card>

      	{this.state.isTransaction &&
      		
      		<Card alignItems="center" justifyContent="center">
      		<Card marginTop={10} borderWidth={1} width={width-20} height={height-200} alignItems="center" justifyContent="center">
      		
      		<Card borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      			<Text>Service Name</Text>
      			<Text>Staff</Text>
      			<Text>Date</Text>
      		</Card>
      		<ScrollView style={{width: width-20}}>
      			<FlatList
      		data={records}
      		renderItem={({item})=>{
      		 let userid = item._id;
      		 return(
      		
      		      		<Button  onPress={()=> this.setState({userid: userid})} borderBottomWidth={1} alignItems="center" justifyContent="space-between" flexDirection="row" width={width-20} height={40}>
      		      			<Text>{item.servicename}</Text>
      		      			<Text>{item.staffname}</Text>
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
      	<Card marginTop={10} alignItems="center" justifyContent="center">
      	   <Card width={width/2}>
              <Text style={[styles.header,{color: '#000000',fontSize: 15}]}>*Based on the current rating of the service from our users.</Text>
           </Card>
           <Card width={width-40} borderWidth={1}>
              <Text style={[styles.header,{color: '#000000',fontSize: 25}]}>We got 55% average rating from 10 people</Text>
           </Card>
      	</Card>
        
        <Card marginTop={10} alignItems="center" justifyContent="center">
        <Card marginTop={10} width={width-40} alignItems="flex-start" >
              <Text style={[styles.header,{color: '#000000',fontSize: 13}]}>BAD:</Text>
              <Text style={[styles.header,{color: '#000000',fontSize: 13}]}>DONT LIKE:</Text>
              <Text style={[styles.header,{color: '#000000',fontSize: 13}]}>NORMAL:</Text>
              <Text style={[styles.header,{color: '#000000',fontSize: 13}]}>GOOD:</Text>
              <Text style={[styles.header,{color: '#000000',fontSize: 13}]}>GREAT:</Text>
           </Card>
          </Card>
         

        </ScrollView>
      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
	return{
		records: state.staff.records,
	}
}

module.exports = connect(mapStateToProps)(AdminHome);