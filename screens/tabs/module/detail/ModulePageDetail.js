/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import { Button, ListItem } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModulePageDetail = ({ navigation, route }) => {
	// ref
	const bottomSheetRef = useRef();

	// variables
	const snapPoints = useMemo(() => ['0%', '25%', '50%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index) => {
		//console.log('handleSheetChanges', index);
	}, []);

	const [isVisible, setIsVisible] = React.useState(false);

	const actionList = [
		{ title: 'Edit', icon: 'square-edit-outline' },
		{ title: 'Clone', icon: 'content-copy' },
		{ title: 'Delete', icon: 'delete' }
	];

	return (
		<View style={styles.contentContainer}>
			<Text>ModuleDetailHome</Text>
			<Button
				type="outline"
				title="Open Bottom Sheet"
				onPress={() => {
					bottomSheetRef.current.snapTo(1);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: 'grey'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	}
});

export default ModulePageDetail;
