import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		//alignItems: 'flex-start',
		justifyContent: 'flex-start',
		padding: 15
	},
	loading_container: {
		flex: 1,
		justifyContent: 'center'
	},
	loading_horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	},
	fieldView: {
		width: '100%',
		minHeight: 88,
		justifyContent: 'center'
	},
	fieldName: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingTop: 10,
		paddingBottom: 10
	},
	requiredFieldName: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingTop: 10,
		paddingBottom: 10,
		color: 'red'
	}
});
