import { StyleSheet } from 'react-native';
import ThemeColor from '../../constants/ThemeColor';

const btnStyle = StyleSheet.create({
	container: {
		borderRadius: 5,
		flex: 1,
		margin: 5,
		backgroundColor: ThemeColor.PRIMARY
	},
	button: {
		height: 50
	},
	title: {
		fontSize: 18
	},
	halfContainer: {
		borderRadius: 5,
		width: '100%',
		backgroundColor: ThemeColor.PRIMARY
	}
});

export default btnStyle;
