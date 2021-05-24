/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function NotFoundComponent({ missingThing = 'Data', ...screenInfo }) {
	const screenHeight = screenInfo?.windowHeight ? screenInfo?.windowHeight : 683;
	return (
		<View style={[styles.container, { height: screenHeight / 2 }]}>
			<Text style={styles.notFoundText}>Not Found {missingThing}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	notFoundText: {
		color: '#a1a1a1',
		fontSize: 20
	}
});
