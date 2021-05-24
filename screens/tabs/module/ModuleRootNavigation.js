import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createStackNavigator, HeaderBackButton, TransitionSpecs } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';

import AuthContext from '../../../context/AuthContext';
import ModuleContext from '../../../context/ModuleContext';

import ThemeColor from '../../../constants/ThemeColor';
import MyView from './options/MyView';
import { ConvertApiName } from '../../../helper/StringUtils';

import ModuleHome from './ModuleHome';
import RootView from './view/RootView';
import ModulePageRoot from './detail/ModulePageRoot';
import ModulePageDetail from './detail/ModulePageDetail';
import ModulePageEdit from './detail/ModulePageEdit';
import ModulePageCreate from './detail/ModulePageCreate';
import ModuleChangelog from './detail/ModuleChangelog';
import ModuleSharing from './detail/ModuleSharing';
import ModuleSharingNew from './detail/ModuleSharingNew';

const ModuleStack = createStackNavigator();

const ModuleRootNavigation = (props) => {
	const { userData } = React.useContext(AuthContext);
	const ModuleInfoContext = React.useContext(ModuleContext);

	const TargetModule = ModuleInfoContext.GetModuleInfoState()?.moduleName;
	const TargetModuleApiName = ConvertApiName(TargetModule);

	const routeName = getFocusedRouteNameFromRoute(props.route) ?? 'Home';

	const screenOptions = {
		headerStyle: {
			backgroundColor: ThemeColor.PRIMARY
		},
		headerTintColor: ThemeColor.INVERT_PRIMARY,
		headerTitleStyle: {
			fontWeight: 'bold'
		}
		//headerTitle: (prop) => <SearchBar {...prop} />
	};

	return (
		<ModuleStack.Navigator screenOptions={screenOptions}>
			<ModuleStack.Screen
				name="ModuleHome"
				component={ModuleHome}
				options={{
					title: 'Home',
					headerLeft: () => (
						<TitleBarButton
							navigation={props.navigation}
							data="menu"
							event={() => props.navigation.dispatch(DrawerActions.openDrawer())}
						/>
					)
				}}
			/>
			<ModuleStack.Screen
				name="ModuleRootView"
				component={RootView}
				options={{
					title: TargetModule === undefined ? 'View' : TargetModule,
					headerLeft: () => (
						<TitleBarButton
							navigation={props.navigation}
							data="menu"
							event={() => props.navigation.dispatch(DrawerActions.openDrawer())}
						/>
					)
				}}
			/>
			<ModuleStack.Screen
				name="ModulePageRoot"
				component={ModulePageRoot}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>
			<ModuleStack.Screen
				name="ModulePageDetail"
				component={ModulePageDetail}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>
			<ModuleStack.Screen
				name="ModulePageEdit"
				component={ModulePageEdit}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>

			<ModuleStack.Screen
				name="ModulePageCreate"
				component={ModulePageCreate}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>
			<ModuleStack.Screen
				name="ModuleChangelog"
				component={ModuleChangelog}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>

			<ModuleStack.Screen
				name="ModuleSharing"
				component={ModuleSharing}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>
			<ModuleStack.Screen
				name="ModuleSharingNew"
				component={ModuleSharingNew}
				options={{ title: TargetModule === undefined ? 'View' : TargetModule }}
			/>
		</ModuleStack.Navigator>
	);

	function TitleBarButton({ navigation, data, event }) {
		return (
			<View style={titleBarButton.titleIcon}>
				<TouchableOpacity onPress={event}>
					<Icon name={data} size={24} color={ThemeColor.INVERT_PRIMARY} />
				</TouchableOpacity>
			</View>
		);
	}
};

const titleBarButton = StyleSheet.create({
	titleIcon: {
		margin: 16,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default ModuleRootNavigation;
