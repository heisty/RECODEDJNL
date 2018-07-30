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
  FlatList
} from 'react-native';

class Crew extends Component {
  render() {
  	const { height,width } = Dimensions.get('window');
    return (
      <Container>
      	<Card>
      		<Card alignItems="center" justifyContent="center" width={width} height={50} backgroundColor="teal">
      			<Text style={[styles.header,{color: '#FFFFFF',fontSize: 20}]}>Our Employees</Text>
      		</Card>
          </Card>
          <FlatList 
          data={staff}
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

      	
      </Container>
    );
  }
}



module.exports = Crew;