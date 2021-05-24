import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ModuleRootNavigation from './module/ModuleRootNavigation';
import MenuRoot from './menu/MenuRoot';
import ThemeColor from './../../constants/ThemeColor';
import MainDrawer from './module/drawer/MainDrawer';
import ChatRoot from './chat/ChatRoot';

const Tab = createBottomTabNavigator();

const RootBottomTab = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				activeTintColor: ThemeColor.ACTIVE_ICON,

				keyboardHidesTabBar: true
			}}>
			<Tab.Screen
				options={{
					title: 'Module',
					tabBarIcon: ({ focused, color, size }) => {
						return <Icon name="home" size={25} color={color} />;
					}
				}}
				name="MainDrawer"
				component={MainDrawer}
			/>
			<Tab.Screen
				options={{
					title: 'Message',
					tabBarIcon: ({ focused, color, size }) => {
						return <Icon name="forum" size={25} color={color} />;
					}
				}}
				name="ChatRoot"
				component={ChatRoot}
			/>
			<Tab.Screen
				options={{
					title: 'Menu',
					tabBarIcon: ({ focused, color, size }) => {
						return <Icon name="cog" size={25} color={color} />;
					}
				}}
				name="MenuRoot"
				component={MenuRoot}
			/>
		</Tab.Navigator>
	);
};

export default RootBottomTab;
