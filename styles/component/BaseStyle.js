import { StyleSheet } from 'react-native';
import ThemeColor from '../../constants/ThemeColor';

export default StyleSheet.create({
	fieldView: {
		width: '100%',
		minHeight: 88,
		justifyContent: 'center'
	},
	fieldName: {
		fontWeight: 'bold',
		//fontFamily: 'arial, helvetica, sans-serif',
		paddingTop: 10,
		paddingBottom: 10
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84

		//elevation: 5
	},
	baseText: {
		color: ThemeColor.BaseComponent
	}
});
