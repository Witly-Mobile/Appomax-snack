import { StyleSheet } from 'react-native';
import ThemeColor from '../../constants/ThemeColor';

export const InputStyle = StyleSheet.create({
	container: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: ThemeColor.BORDER,
		height: 50,
		marginBottom: 20,
		paddingStart: 0
	},
	inputContainer: {
		borderBottomWidth: 0
	}
});
