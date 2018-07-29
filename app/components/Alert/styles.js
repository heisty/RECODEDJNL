import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	alert: {
		flex: 1,
		flexDirection: 'row',
		padding: 16,
		backgroundColor: '#f2dede',
		borderColor: '#ebccd1',
		borderTopWidth: 2,
	},
	text: {
		color: '#a94442'
	}
});

module.exports = styles;