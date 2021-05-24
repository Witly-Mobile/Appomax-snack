/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';

import GridView from './GridView';
import ListView from './ListView';
import { ConvertApiName, IsEmptyOrNullOrUndefined } from '../../../../helper/StringUtils';
import { RestClient } from '../../../../helper/RestClient';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

const TopTab = createMaterialTopTabNavigator();

const RootView = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);

	const titleBarButton = StyleSheet.create({
		titleIcon: {
			margin: 16,
			alignItems: 'center',
			justifyContent: 'center'
		}
	});

	React.useLayoutEffect(() => {
		let currentModuleName = ModuleInfo.GetModuleInfoState().moduleName;
		//console.log('[RootView] currentModuleName', currentModuleName);
		navigation.setOptions({
			title: currentModuleName === '' ? 'View' : currentModuleName
			/* headerRight: () => (
				<Button
					type="outline"
					title={'My View'}
					containerStyle={titleBarButton.titleIcon}
					titleStyle={{ color: '#FFF' }}
					border
					onPress={() => console.log('Damn it')}
				/>
			) */
		});

		//get list of page layout
		async function GetModuleRolePageLayoutList() {
			if (!IsEmptyOrNullOrUndefined(currentModuleName)) {
				try {
					const query = new URLSearchParams({
						token: userData?.Token
					});

					const url = `/${ConvertApiName(currentModuleName)}/page-layouts?${query.toString()}`;

					await RestClientInstance()
						.get(url)
						.then((response) => {
							//Page Layout Detail
							let layoutList = response?.data;

							if (layoutList && layoutList.length > 0) {
								const accessibleLayoutList = layoutList.filter(
									(layout) => layout['Role Name'] === profile?.Role
								);
								ModuleInfo.SetPageLayoutList(accessibleLayoutList);
							}
						})
						.catch((errorResp) => {
							console.log('[RootView] GetModuleDescribe', url, errorResp);
						})
						.finally(() => {});
				} catch (e) {
					console.log(e);
				}
			}
		}

		//getModuleDescribe
		async function GetModuleDescribe() {
			try {
				const query = new URLSearchParams({
					token: userData?.Token
				});
				const url = `/${ConvertApiName(currentModuleName)}/describe?${query.toString()}`;

				await RestClientInstance()
					.get(url)
					.then((response) => {
						ModuleInfo.SetDescribe(response.data);
					})
					.catch((errorResp) => {
						console.log('[RootView] GetModuleDescribe', url, errorResp);
					})
					.finally(() => {});
			} catch (e) {
				console.log(e);
			}
		}

		GetModuleDescribe();
		GetModuleRolePageLayoutList();

		return () => {};
	}, [ModuleInfo.GetModuleInfoState().moduleName]);

	return (
		<TopTab.Navigator initialRouteName="Grid" tabBarOptions={{ showIcon: true, showLabel: false }}>
			<TopTab.Screen
				name="List"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Icon name={focused ? 'view-list' : 'view-list'} color={color} size={25} />
					)
				}}
				component={ListView}
			/>
			<TopTab.Screen
				name="Grid"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Icon name={focused ? 'grid' : 'grid'} color={color} size={25} />
					)
				}}
				component={GridView}
			/>
		</TopTab.Navigator>
	);
};

export default RootView;
