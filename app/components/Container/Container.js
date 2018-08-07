import React from 'react';
import { View,Image,ImageBackground } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import styles from './styles';

const Container = ({children,backgroundColor}) => {

	return(
		<View style={styles.container}>
		{children}
		
		</View>
		);
    


}

module.exports = Container;