/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	StyleSheet,
	Pressable,
	ActivityIndicator
} from 'react-native';
import { Button, Card, ListItem, Image } from 'react-native-elements';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import SafeAreaView from 'react-native-safe-area-view';

import BaseStyles from '../../../../styles/component/BaseStyle';
import MainStyles from '../../../../styles/MainStyle';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import ThemeColor from '../../../../constants/ThemeColor';
import { BuildImageSource } from '../../../../helper/StringUtils';
import Dialog from 'react-native-dialog';
import { RestClient } from '../../../../helper/RestClient';
import LoadingStyle from '../../../../styles/component/LoadingStyle';
import { BASE_URL, SUCCESS_FLAG } from '../../../../constants/Globals';

const SystemAppSelection = ({ navigation, route }) => {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const [selectedApp, setSelectedApp] = React.useState({});
	const [dialogVisible, setDialogVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const ModuleInfo = React.useContext(ModuleContext);
	const formMethods = useForm();

	const apps = route.params?.sidebar?.Apps;
	const OnSelectDone = route.params?.OnDone;
	const OnSelectError = route.params?.OnError;

	//console.log('[SystemAppSelection] Sidebar=', apps);

	const OnAppPressed = (app) => {
		setSelectedApp(app);
		setDialogVisible(true);
	};

	const OnDialogOK = () => {
		SelectSystemApplication(selectedApp?.id, selectedApp?.Name);
		setDialogVisible(false);
		setIsLoading(false);
	};
	const OnDialogCancel = () => {
		setDialogVisible(false);
	};

	async function SelectSystemApplication(selectedAppId, appName) {
		setIsLoading(true);

		let query = new URLSearchParams({
			token: userData?.Token,
			app_id: selectedAppId
		});
		const url = BASE_URL + 'selectapp?' + query.toString();

		await RestClientInstance()
			.get(url)
			.then((response) => {
				//OnSelectDone(`'App "${appName}" was selected successfully'`);
				ModuleInfo.SetActionResult({
					status: SUCCESS_FLAG,
					message: `'App "${appName}" was selected successfully'`
				});
				navigation.navigate('MenuHome');
			})
			.catch((error) => {
				console.log('[SystemAppSelection] SelectSystemApplication', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	React.useLayoutEffect(() => {
		setIsLoading(false);
	}, []);

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<FormProvider {...formMethods}>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<View style={{ marginBottom: 20 }}>
						<Card containerStyle={{}} wrapperStyle={{}}>
							<Card.Title
								h4
								h4style={{ fontSize: 16 }}
								style={[{ alignSelf: 'flex-start' }, BaseStyles.baseText]}>
								Select System App
							</Card.Title>
							<View
								style={{
									flex: 1
								}}>
								{apps?.map((app, index) => {
									return (
										<Pressable key={index} onPress={() => OnAppPressed(app)}>
											<View style={styles.appBox}>
												<Image
													source={BuildImageSource(app['Icon Url'])}
													style={styles.appBoxIcon}
												/>
												<Text style={styles.text}>{app?.Name}</Text>
											</View>
										</Pressable>
									);
								})}
							</View>
							<Card.Divider style={{ margin: 0 }} />
						</Card>
					</View>
					<Dialog.Container visible={dialogVisible}>
						<Dialog.Title>Select App</Dialog.Title>
						<Dialog.Description>{`DO you want to select '${selectedApp?.Name}'`}</Dialog.Description>
						<Dialog.Button label="Cancel" onPress={() => OnDialogCancel()} />
						<Dialog.Button label="Yes" onPress={() => OnDialogOK()} />
					</Dialog.Container>
				</ScrollView>
			</View>
		</FormProvider>
	);
};

const styles = StyleSheet.create({
	appBox: {
		flexDirection: 'row',
		flex: 1,
		height: 60,
		margin: 10,
		paddingHorizontal: 20,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#6e6e6e',
		borderRadius: 10
	},
	appBoxIcon: {
		width: 40,
		height: 40,
		marginEnd: 20
	},
	text: {
		fontSize: 16,
		color: '#6e6e6e'
	}
});

export default SystemAppSelection;
