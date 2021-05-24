/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Image resizeMode="center" source={require('../resources/img/witly_welcome.png')} />
		</View>
	);
};

export default SplashScreen;
