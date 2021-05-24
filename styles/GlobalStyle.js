import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	rootContainer: {
		flex: 1
		//paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		padding: 16,
		backgroundColor: '#fff',
		borderColor: '#e5e5e5',
		borderWidth: 1
	}
});
