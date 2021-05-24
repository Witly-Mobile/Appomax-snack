import { StyleSheet } from 'react-native';
import ThemeColor from '../../constants/ThemeColor';

export default StyleSheet.create({
	itemContainer: {
		flex: 1,
		padding: 25
	},
	listTitle: {
		fontSize: 16,
		marginBottom: 20,
		color: '#6e6e6e',
		paddingHorizontal: 25
	},
	listItem: { fontWeight: 'bold', fontSize: 16, color: '#6e6e6e', marginStart: 32 }
});
