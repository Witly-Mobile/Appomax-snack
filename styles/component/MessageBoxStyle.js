import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	msgBox: {
		flexDirection: 'row',
		padding: 15,
		borderColor: '#c5c5c5',
		borderWidth: 1,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center'
	},
	successMsgBox: {
		backgroundColor: '#fff5b6'
	},
	errorMsgBox: {
		backgroundColor: '#ffcece'
	}
});
