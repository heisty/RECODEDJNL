import React from 'react';
import {
	View,
	Text,
	Dimensions
} from 'react-native';
import Card from '../Card';
import styles from './styles';
const Header = ({text}) =>{
	return(
		<View>
		<Card flex={1} backgroundColor="#4CAF50" alignItems="center" justifyContent="center">
			<Text style={styles.header}>JNL SALON</Text>
			<Text style={styles.quote}>Beauty and Health Awareness</Text>
		</Card>
		<Card height={30} backgroundColor="#246C34" alignItems="center" justifyContent="center">
			<Text style={[styles.quote],{color: '#FFFFFF',fontSize: 20,}}>{text}</Text>
		</Card>
		</View>
		);
}

module.exports = Header;