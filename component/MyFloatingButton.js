/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import BaseComponentStyles from '../styles/component/BaseStyle';
import ThemeColor from '../constants/ThemeColor';
import { Button } from 'react-native-elements';
export const FloatingButton = (props) => {
	const { size, icon = 'microsoft-xbox-controller-menu', color, onPress, ...btnProp } = props;
	return (
		<Pressable onPress={onPress} style={[styles.fabStyle]}>
			<Icon name={icon} size={size} color={color} />
		</Pressable>
	);
};

export const FloatingTextButton = (props) => {
	const { text, size, icon = 'plus', color, onPress, ...btnProp } = props;
	return (
		<Button
			type="outline"
			icon={<Icon name={icon} size={size} color={'#FFF'} />}
			title={text}
			titleStyle={{
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: size / 2
			}}
			onPress={onPress}
			containerStyle={styles.fabStyle}
			buttonStyle={[styles.textFab, { backgroundColor: color }]}
		/>
	);
};

const styles = StyleSheet.create({
	fabStyle: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30
	},
	textFab: {
		borderRadius: 30,
		paddingHorizontal: 15,
		paddingVertical: 10
	}
});
