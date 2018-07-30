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
import {staff} from '../inappData/staff';

import {
  Text,
  Dimensions,
  ScrollView,
  FlatList
} from 'react-native';

class Purchase extends Component {
  render() {
  	const { service } = this.props.navigation.state.params;
  	const { width,height } = Dimensions.get('window');
    return (
    <ScrollView>
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


      	<Card justifyContent="center" width={width} height={240} backgroundColor="#246C34">
      	 <Text style={[styles.header,{color: '#FFFFFF',fontSize: 15}]}>Swap Left to Right</Text>
        <Card width={width} height={200}  backgroundColor="white" justifyContent="center">
      {/*FLAT LIST OF STAFF*/}
      
        <FlatList 
          data={staff}
          horizontal={true}
          renderItem={({item})=> {
            return(
              <Button alignItems="center"  justifyContent="space-between">
                <Card width={width/2} margin={10} height={190} borderRadius={8} backgroundColor="gray">
                  <Text>{item.name}</Text>
                </Card>
              </Button>
             

              );
          }}

          keyExtractor={(item)=> item.name}

        
          />
            
      {/**/}
      	</Card>
      	<Text style={[styles.header,{color: '#FFFFFF',fontSize: 15}]}>Please choose your desired massager or employee.</Text>
      	</Card>




      	{/**/}
      {/*AVAIL*/}
      	<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Button alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
      			<Text>Avail</Text>
      		</Button>
      	</Card>
      	<Card marginTop={10} alignItems="center" justifyContent="center">
      		<Button alignItems="center" justifyContent="center" borderRadius={8} borderWidth={1} borderColor="teal" backgroundColor="rgba(255,255,255,0)" width={width-50} height={50}>
      			<Text>Avail for Home Service</Text>
      		</Button>
      	</Card>

      </Container>
      </ScrollView>
    );
  }
}




module.exports = Purchase;