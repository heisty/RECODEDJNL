'use strict';

import React, { Component } from 'react';

import {
  View,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import Alert from './Alert';
class AlertContainer extends Component {
  render() {
  	var renderAlerts = () =>{
    		return this.props.alerts.map((alert) =>{
    			<Alert alert={alert} key={alert.id}/>
    		});
    	}
    return (
      <View style={styles.container}>
      {renderAlerts()}
      </View>
    );
  }
}

var mapStateToProps = (state) =>{
	return{
		alerts: state.alerts,
	}
		
}

module.exports = connect(mapStateToProps)(AlertContainer);