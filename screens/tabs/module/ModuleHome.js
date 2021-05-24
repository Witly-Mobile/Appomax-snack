/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, ScrollView, StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseStyles from '../../../styles/component/BaseStyle';

import AuthContext from './../../../context/AuthContext';
import { Card, ListItem } from 'react-native-elements';
import { RestClient } from '../../../helper/RestClient';

import { HOST } from '../../../constants/Globals';

import signalr from 'react-native-signalr';

const ModuleHome = (props) => {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const [moduleList, setModuleList] = React.useState([]);

	//http://192.168.1.23:8989/secure/signalr
	React.useEffect(() => {
		/* 		async function SignalRConnector() {
			//This is the server under /example/server published on azure.
			const connection = signalr.hubConnection('http://192.168.1.23:8989/secure');
			connection.logging = true;

			const proxy = connection.createHubProxy('chatHub');
			//receives broadcast messages from a hub function, called "helloApp"
			proxy.on('helloApp', (argOne, argTwo, argThree, argFour) => {
				console.log('message-from-server', argOne, argTwo, argThree, argFour);
				//Here I could response by calling something else on the server...
			});

			// atempt connection, and handle errors
			await connection
				.start()
				.done(() => {
					console.log('Now connected, connection ID=' + connection.id);

					 proxy
						.invoke('helloServer', 'Hello Server, how are you?')
						.done((directResponse) => {
							console.log('direct-response-from-server', directResponse);
						})
						.fail(() => {
							console.info(
								'Something went wrong when calling server, it might not be up and running?'
							);
						});
				})
				.fail(() => {
					console.log('Failed');
				});

			//connection-handling
			connection.connectionSlow(() => {
				console.log('We are currently experiencing difficulties with the connection.');
			});

			connection.error((error) => {
				const errorMessage = error.message;
				let detailedError = '';
				if (error.source && error.source._response) {
					detailedError = error.source._response;
				}
				if (
					detailedError ===
					'An SSL error has occurred and a secure connection to the server cannot be made.'
				) {
					console.log(
						'When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14'
					);
				}
				console.debug('SignalR error: ' + errorMessage, detailedError);
			});
		}
 */
		async function FetchAllModules() {
			let query = new URLSearchParams({
				token: userData?.Token
			});
			const url = '/sidebar?' + query.toString();
			//console.log('[ModuleHome-sidebar] Url', url);
			await RestClientInstance()
				.get(url)
				.then(function (response) {
					setModuleList(response.data?.Module?.map((module) => module?.Name));
				})
				.catch(function (error) {
					// handle error
					console.info('[ModuleHome-sidebar] Exception axios.get', error);
				})
				.finally(function () {
					// always executed
				});
		}

		FetchAllModules();
		//SignalRConnector();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<View style={{ marginBottom: 20 }}>
					<Card containerStyle={{}} wrapperStyle={{}}>
						<Card.Title
							h4
							h4style={{ fontSize: 16 }}
							style={[{ alignSelf: 'flex-start' }, BaseStyles.baseText]}>
							{`Hello, ${userData?.Fullname}`}
						</Card.Title>
						{/* <Card.Divider style={{ margin: 0 }} />
						<View>
							{moduleList?.flatMap((name, index) => (
								<ListItem key={index}>
									<ListItem.Content>
										<ListItem.Title style={{ color: '#6e6e6e', fontWeight: 'bold' }}>
											{name}
										</ListItem.Title>
									</ListItem.Content>
									<ListItem.Chevron color="white" />
								</ListItem>
							))}
						</View> */}
					</Card>
				</View>
			</ScrollView>
		</View>
	);
};
export default ModuleHome;
