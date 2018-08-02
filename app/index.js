import React from 'react';
import {configureStore} from './store';
import {Provider} from 'react-redux';
import App from './config/routes';
//import { NetworkInfo } from 'react-native-network-info';
//import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//import AlertContainer from './components/Alert/AlertContainer';

EStyleSheet.build({
	$primaryBlue: '#2196F3',
	$primaryRed: '#F44336',
	$primaryWhite: '#FFFFFF',
	$transparent: 'rgba(255,255,255,0)',
	$primaryGreen: '#4CAF50',
	$primaryYellow: '#FFEB3B',
	$primaryOrange: '#FF5722',
	$primaryGrey: '#FF5722',
})
class index extends React.Component{
		
	render(){
		return(

			<Provider store={configureStore()}>
			<App />
			</Provider>

			);
	}
}
module.exports = index;