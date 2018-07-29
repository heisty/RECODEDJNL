'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {removeAlert} from 'JNLBHA/app/actions/alertsActions';
class Alert extends Component {

	onRemoveAlert=()=>{
		this.props.dispatch(removeAlert(this.props.alert.id));
	}
  render() {
    return (
    <TouchableWithoutFeedback onPress={this.onRemoveAlert}>
      <View style={styles.alert}>
      	<Text style={styles.text}>
      		{this.props.alert.text}
      	</Text>
      </View>
     </TouchableWithoutFeedback>
    );
  }
}



// var mapStateToProps = (state) =>{
// 	return{
// 		alert: state.alerts,
// 	}
// }

module.exports =  connect()(Alert);