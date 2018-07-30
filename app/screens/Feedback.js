'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import Pic from '../components/Pic';
import Card from '../components/Card';
import {Rating,AirbnbRating} from 'react-native-ratings';
import styles from './styles';

import {
	Text,
	Dimensions
} from 'react-native';

class Feedback extends Component {
	ratingCompleted = (rating) =>{

	}
  render() {
  	const { width,height } = Dimensions.get('window');
    return (
     	<Container>
     		<Card width={width} height={60} alignItems="center" justifyContent="center">
     			<Text style={[styles.header],{color: '#000000',fontSize: 20}}>Please tell us your experience</Text>
     			<Text style={[styles.header],{color: '#000000',fontSize: 15}}>We value your suggestions and comments.</Text>
     		</Card>
     		<Card height={height} alignItems="center" justifyContent="center">
     			<AirbnbRating 
     				type='heart'
     				ratingCount={5}
     				reviews={["Bad service","Don't like the service","Normal Service","Good Service","Great Service"]}
     				imageSize={60}
     				showRating
     				onFinishRating = {this.ratingCompleted}
     				style={{paddingVertical: 10}}
     				/>
     		<Card alignItems="center" justifyContent="center">
     		<Button  alignItems="center" justifyContent="center" width={width-50} height={50} backgroundColor="teal" borderWidth={1} borderColor="#000000" borderRadius={8}>
     			<Text style={[styles.header],{color: '#FFFFFF',fontSize: 20}}>Submit Rating</Text>
     		</Button>
     		</Card>
     		</Card>
     		

     	</Container>
    );
  }
}



export default Feedback;