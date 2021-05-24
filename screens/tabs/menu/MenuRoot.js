import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuHome from './MenuHome';
import ProfileDetail from './profile/ProfileDetail';
import ProfileEdit from './profile/ProfileEdit';
import SystemAppSelection from './preferences/SystemAppSelection';
import AppSetting from './preferences/AppSetting';
import NotificationList from './NotificationList';
import ResetPwd from './../../authentication/ResetPwd';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import InteractivePressable from '../../../component/InteractivePressable';

const MoreStack = createStackNavigator();

const MenuRoot = ({ navigation, route }) => {
	return (
		<MoreStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#3398ea'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}>
			<MoreStack.Screen
				name="MenuHome"
				component={MenuHome}
				options={{
					headerTitle: 'Menu',
					headerRight: () => {
						return (
							<InteractivePressable onPress={() => navigation.navigate('NotificationList')}>
								<Icon name="bell" size={28} color="#FFFFFF" style={{ marginEnd: 16 }} />
							</InteractivePressable>
						);
					}
				}}
			/>

			<MoreStack.Screen
				name="ProfileDetail"
				component={ProfileDetail}
				options={{ headerTitle: 'Profile Information' }}
			/>

			<MoreStack.Screen
				name="ProfileEdit"
				component={ProfileEdit}
				options={{ headerTitle: 'Profile Edit' }}
			/>

			<MoreStack.Screen
				name="ResetPwd"
				component={ResetPwd}
				options={{ headerTitle: 'Reset Password' }}
			/>

			<MoreStack.Screen
				name="SystemAppSelection"
				component={SystemAppSelection}
				options={{ headerTitle: 'Select System Application' }}
			/>

			<MoreStack.Screen
				name="AppSetting"
				component={AppSetting}
				options={{ headerTitle: 'Application Settings' }}
			/>

			<MoreStack.Screen
				name="NotificationList"
				component={NotificationList}
				options={{ headerTitle: 'Notifications' }}
			/>
		</MoreStack.Navigator>
	);
};

export default MenuRoot;
