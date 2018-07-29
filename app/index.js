import React from 'react';
import {configureStore} from './store';
import {Provider} from 'react-redux';
import App from './config/routes';
import EStyleSheet from 'react-native-extended-stylesheet';

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