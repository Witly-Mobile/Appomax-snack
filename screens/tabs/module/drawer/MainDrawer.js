/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import GlobalStyle from '../../../../styles/GlobalStyle';

import AuthContext from '../../../../context/AuthContext';

import DrawerContent from './ContentDrawer';
import ModuleRootNavigation from '../ModuleRootNavigation';

const Drawer = createDrawerNavigator();
const MainDrawer = () => {
	const { userData } = React.useContext(AuthContext);

	return (
		<SafeAreaView style={GlobalStyle.rootContainer}>
			<Drawer.Navigator
				initialRouteName="ModuleRootNavigation"
				drawerContent={(props) => <DrawerContent {...props} userData={userData} />}>
				<Drawer.Screen name="ModuleRootNavigation" component={ModuleRootNavigation} />
			</Drawer.Navigator>
		</SafeAreaView>
	);
};

export default MainDrawer;
