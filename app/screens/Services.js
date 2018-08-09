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
//import {services} from '../inappData/services';
import {
  View,
  FlatList,
  Text,
  Dimensions
} from 'react-native';
class Services extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
     services: null
    };
  }
  // 
  componentWillMount(){
      this.setState({
        services: this.props.services
      })
  }  

  render() {


  	const { width,height } = Dimensions.get('window');
    console.warn(this.props.services);
    return(
      		

      		<Container>

      	{/*TOP HEADER*/}
      		
      		<Card backgroundColor="white" alignItems="center" justifyContent="center" width={width} height={50}>
      			<Text style={[styles.header,{fontSize: 14,color: '#000000'}]}>Choose your desired service.</Text>
      		</Card>
      	{/**/}
      		{/*RENDER SERVICES*/}
      		<FlatList
      			data={this.props.services}
      			renderItem={({item})=> {
      				return(
                <Card  alignItems="center" justifyContent="center">
      						<Button onPress={()=> this.props.navigation.navigate('Modal',{service: item})} marginTop={10} backgroundColor="#FFFFFF" borderWidth={1} borderColor="teal" borderRadius={5} alignItems="center" justifyContent="center" width={width-50} height={60}>
                       <Text style={[styles.header],{color: 'teal',fontSize: 20,}}>{item.title} -- PHP {item.price}</Text>   
                  </Button>
                </Card>
      					);
      			}}
      			keyExtractor={(item)=> item.title}
      		/>
      			{/*END RENDER*/}

      		</Container>

    );
  }
}




var mapStateToProps = (state) => {
  return {
    services: state.customer.services,
  }
}

module.exports = connect(mapStateToProps)(Services);