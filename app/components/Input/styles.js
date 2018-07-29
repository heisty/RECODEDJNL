import { StyleSheet,Dimensions } from 'react-native';
const styles = StyleSheet.create({
	input: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		width: Dimensions.get('window').width-70,
		height: 53,
		fontFamily: 'Oswald-Light',
		fontSize: 18,
		color: '#FFFFFF',
	}
});
module.exports = styles;