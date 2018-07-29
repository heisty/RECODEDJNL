import React from 'react';
import { Alert } from 'react-native';
const BoxAlert = ({title,message,btn,cancelable}) => 
{
	return(

		Alert.alert(
 			 {title},
 			 {message},
  				[
 			   {text: {btn}, onPress: () => console.log('Ask me later pressed')},
 			 ],
  			{ cancelable }
			)

		);
}
module.exports = BoxAlert;