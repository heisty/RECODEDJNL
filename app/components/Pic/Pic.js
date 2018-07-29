import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
const Pic = ({children,location,width,height})=>{
	return(
		<Image resizeMode="contain" style={[styles.image,{width,height}]} source={location}>{children}</Image>
		);
};
Pic.propTypes = {
	location: PropTypes.any,
}
module.exports = Pic;