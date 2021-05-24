import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Overlay, Text, TouchableOpacity } from 'react-native-elements';
import { DrawerItem, DrawerContentScrollView, useIsDrawerOpen } from '@react-navigation/drawer';
import { RestClient } from '../../../../helper/RestClient';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';

import MainStyle from '../../../../styles/MainStyle';
import DrawerStyle from '../../../../styles/DrawerStyle';
import { SidebarAPI } from '../../../../helper/MockWitlyAPI';
import { getFocusedRouteNameFromRoute, StackActions } from '@react-navigation/native';
import { ConvertApiName, ConvertDisplayName } from '../../../../helper/StringUtils';

const DrawerContent = (props) => {
	const { RestClientInstance, userData, setApps } = React.useContext(AuthContext);
	const ModuleInfoContext = React.useContext(ModuleContext);

	const [isLoading, setIsLoading] = React.useState(true);

	const [moduleList, setModuleList] = React.useState([]);
	const [sidebar, setSidebar] = React.useState(null);
	const isDrawerOpen = useIsDrawerOpen();

	React.useEffect(() => {
		let userToken = '';
		if (userData) {
			if (typeof userData === 'string') {
				const userDataObj = JSON.parse(userData);
				userToken = userDataObj.Token;
			} else {
				userToken = userData.Token;
			}

			if (isDrawerOpen) {
				GetSidebar(userToken);
			}
		}

		return () => {};
	}, [isDrawerOpen]);

	React.useEffect(() => {
		if (sidebar != null && sidebar?.Errors == null) {
			setApps(sidebar?.Apps);
			setIsLoading(false);

			const items = [];
			/* Module Section */
			items.push(CreateSectionItem('section-module', 'Module'));
			sidebar.Module?.map((m, index) => {
				items.push(
					createItem({
						key: `${m.Name}_${index}`,
						navigation: props.navigation,
						displayName: m.Name,
						targetName: m.Name
					})
				);
			});
			/* Recently Viewed */
			items.push(CreateSectionItem('section-recently-viewed', 'Recently Viewed'));
			sidebar['Recently Viewed']?.map((m, index) => {
				//console.log('Recently Viewed', m);
				items.push(
					createRecordItem({
						key: `${m.Id}_${index}`,
						navigation: props.navigation,
						displayName: m['Object Name']?.toString(),
						moduleName: m['Module Name']?.toString(),
						recordExtId: m?.Id
					})
				);
			});

			/* Favorite Records */
			items.push(CreateSectionItem('section-favorite-records', 'Favorite Records'));
			sidebar['Favorite Records']?.map((m, index) => {
				items.push(
					createRecordItem({
						key: `${m.Id}_${index}`,
						navigation: props.navigation,
						displayName: m['Object Name']?.toString(),
						moduleName: m['Module Name']?.toString(),
						recordExtId: m?.Id
					})
				);
			});

			/* Favorite Views */
			items.push(CreateSectionItem('section-favorite-views', 'Favorite Views'));
			sidebar['Favorite Views']?.map((m, index) => {
				//console.log('Favorite Views', m);
				items.push(
					createViewItem({
						key: `${m.Id}_${index}`,
						navigation: props.navigation,
						displayName: m['Object Name']?.toString(),
						moduleName: m['Module Name']?.toString(),
						viewExtId: m?.Id
					})
				);
			});

			setModuleList(items);
		}
	}, [sidebar]);

	async function GetSidebar(token) {
		try {
			const query = new URLSearchParams({
				token: token
			});
			await RestClientInstance()
				.get(`/sidebar?${query.toString()}`)
				.then((response) => {
					// handle success
					//console.log('[ContentDrawer] response', response);
					setSidebar(response?.data);
				})
				.catch((error) => {
					// handle error
					console.log('[ContentDrawer] Exception axios.get', error);
				})
				.finally(() => {
					// always executed
					// console.log('Finally axios.get');
				});
		} catch (e) {
			console.log(e);
		}
	}

	function createItem(itemProps) {
		const { key, navigation, displayName, targetName } = itemProps;
		return (
			<DrawerItem
				label={displayName}
				activeBackgroundColor="red"
				key={key}
				style={{ height: 40 }}
				onPress={() => {
					ModuleInfoContext.SetCurrentModuleName(targetName);
					navigation.navigate('ModuleRootView', {
						selectedModuleName: targetName
					});
					navigation.closeDrawer();
				}}
			/>
		);
	}

	function createRecordItem(itemProps) {
		const { key, navigation, displayName, moduleName, recordExtId } = itemProps;
		return (
			<DrawerItem
				label={displayName}
				activeBackgroundColor="red"
				key={key}
				style={{ height: 40 }}
				onPress={() => {
					ModuleInfoContext.SetCurrentModuleName(moduleName);
					navigation.navigate('ModulePageRoot', {
						ExtId: recordExtId,
						selectedModuleName: moduleName
					});
					navigation.closeDrawer();
				}}
			/>
		);
	}

	function createViewItem(itemProps) {
		const { key, navigation, displayName, moduleName, viewExtId } = itemProps;
		//console.log('Favorite Views', key, displayName, moduleName, viewExtId);
		return (
			<DrawerItem
				label={displayName}
				activeBackgroundColor="red"
				key={key}
				style={{ height: 40 }}
				onPress={() => {
					console.log();
					ModuleInfoContext.SetCurrentModuleName(ConvertDisplayName(moduleName));
					navigation.navigate('ModuleRootView', {
						ExtId: viewExtId,
						selectedModuleName: ConvertDisplayName(moduleName)
					});
					navigation.closeDrawer();
				}}
			/>
		);
	}

	function CreateSectionItem(key, sectionText) {
		return (
			<View key={key} style={DrawerStyle.section}>
				<Text>{sectionText}</Text>
			</View>
		);
	}

	return isLoading ? (
		<View style={sidebarLoading}>
			<ActivityIndicator size={50} color="#3398ea" />
		</View>
	) : sidebar != null ? (
		<DrawerContentScrollView {...props}>
			{/* <DrawerItemList {...props} /> */}
			{moduleList}
		</DrawerContentScrollView>
	) : (
		<View />
	);
};

const sidebarLoading = StyleSheet.compose(
	MainStyle.loading_container,
	MainStyle.loading_horizontal
);
export default DrawerContent;
