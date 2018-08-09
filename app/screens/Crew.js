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
//import {staff} from '../inappData/staff';
import {
  Text,
  Dimensions,
  FlatList
} from 'react-native';


class Crew extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

      staff: null

    };
  }
  componentWillMount(){
    this.setState({
      staff: this.props.staff,
    })
  }
  render() {
    console.warn(this.state.staff);
  	const { height,width } = Dimensions.get('window');
    var { staff } = this.props;
    return (
      <Container>
      	<Card>
      		<Card alignItems="center" justifyContent="center" width={width} height={50} backgroundColor="white">
      			<Text style={[styles.header,{fontSize: 14,color: '#000000'}]}>Our Employees</Text>
      		</Card>
          </Card>
          <FlatList 
          data={staff}
          renderItem={({item})=> {
            return(
              <Button alignItems="center"  justifyContent="space-between">
                <Card width={110} margin={10} height={110} borderRadius={360} backgroundColor="white" borderWidth={1}>
                  
                </Card>
                <Text>@{item.username}</Text>
              </Button>
             

              );
          }}

          keyExtractor={(item)=> item._id}

          />

      	
      </Container>
    );
  }
}



var mapStateToProps = (state) =>{
  return{
    staff: state.customer.staff,
  }
}


module.exports = connect(mapStateToProps)(Crew);