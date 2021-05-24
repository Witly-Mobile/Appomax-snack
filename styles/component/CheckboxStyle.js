import { StyleSheet } from 'react-native';
import ThemeColor from '../../constants/ThemeColor';

const checkboxStyle = StyleSheet.create({
	container: {
		borderWidth: 0,
		borderColor: ThemeColor.BORDER,
		backgroundColor: '#fff'
	},
	text: {
		fontWeight: '100'
	}
});

export default checkboxStyle;
