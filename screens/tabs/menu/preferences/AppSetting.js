/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Button, Card, ListItem, Image } from 'react-native-elements';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import SafeAreaView from 'react-native-safe-area-view';

import BaseStyles from '../../../../styles/component/BaseStyle';
import MainStyles from '../../../../styles/MainStyle';

import AuthContext from '../../../../context/AuthContext';
import ThemeColor from '../../../../constants/ThemeColor';

import { FormPickerField, PickerField } from '../../../../component/FormPickerField';
import { ViewText } from '../../../../component/ViewText';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { HandleErrorMsg } from '../../../../helper/RestClient';

const AppSetting = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile, setProfile } = React.useContext(AuthContext);
	const [userProfile, setUserProfile] = React.useState(profile);
	//console.log(userProfile);
	async function RefreshUserProfile() {
		let query = new URLSearchParams({
			token: userData?.Token
		});

		await RestClientInstance()
			.get('/profile?' + query.toString())
			.then(
				(response) => {
					setProfile(response.data);
					setUserProfile(response.data);
				},
				(reject) => {
					console.info('reject axios.get', reject);
				}
			)
			.catch(function (error) {
				// handle error
				console.info('Exception axios.get', error);
			})
			.finally(function () {
				// always executed
			});
	}

	async function UpdatePreference(fieldName, value) {
		const query = new URLSearchParams({
			token: userData?.Token,
			userid: profile?.id
		});

		const url = `/profile?${query.toString()}`;

		const body = { [fieldName]: value };
		console.log(url, body);
		await RestClientInstance()
			.put(url, body)
			.then(
				(resp) => {
					console.log('profile', profile['Date Format']);
					showMessage({
						message: `${fieldName} has been changed to ${value} successfully.`,
						type: 'success'
					});
				},
				(reject) => {
					// handle reject
					if (reject.response?.data?.Errors) {
						let msg = HandleErrorMsg(reject.response?.data?.Errors);
						showMessage({
							message: `${fieldName} has been changed to ${value} failed.`,
							type: 'warning'
						});
						console.log(`${fieldName} has been changed to ${value} failed. ${msg}`);
					} else {
						showMessage({
							message: `${fieldName} has been changed to ${value} failed. `,
							type: 'warning'
						});
						console.log(`${fieldName} has been changed to ${value} failed. ${reject}`);
					}
				}
			)
			.catch((errResp) => {
				console.info('[ModuleEdit-Onsubmit] Error', typeof errResp);
			})
			.finally(() => {
				RefreshUserProfile();
			});
	}

	const HandleDateFormat = async (value) => {
		UpdatePreference('Date Format', value);
	};
	const HandleDateSeparator = async (value) => {
		UpdatePreference('Date Separator', value);
	};
	const HandleUILanguage = async (value) => {
		UpdatePreference('UILanguage', value);
	};
	const HandleTimeFormat = async (value) => {
		UpdatePreference('Time Format', value);
	};
	const HandleCurrencyUnit = async (value) => {
		UpdatePreference('Currency Unit', value);
	};
	const HandleDisplayTimeZone = async (value) => {
		UpdatePreference('Display Time Zone', value);
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<View style={{ marginBottom: 20 }}>
					<Card containerStyle={{}} wrapperStyle={{}}>
						<Card.Title
							h4
							h4style={{ fontSize: 16 }}
							style={[{ alignSelf: 'flex-start' }, BaseStyles.baseText]}>
							Preferences
						</Card.Title>
						<Card.Divider style={{ margin: 0 }} />
						<View style={MainStyles.fieldView}>
							<Text style={MainStyles.fieldName}>Date Format</Text>
							<PickerField
								onValueChange={HandleDateFormat}
								value={GetValueFromObject(userProfile, 'Date Format', 'DateFormat')}
								choices={[
									{ label: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
									{ label: 'dd/MMM/yy', value: 'dd/MMM/yy' },
									{ label: 'M/d/yyyy', value: 'M/d/yyyy' },
									{ label: 'M/d/yy', value: 'M/d/yy' },
									{ label: 'MM/dd/yy', value: 'MM/dd/yy' },
									{ label: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
									{ label: 'yy/MM/dd', value: 'yy/MM/dd' },
									{ label: 'yyyy/MM/dd', value: 'yyyy/MM/dd' }
								]}
							/>
						</View>
						<View style={MainStyles.fieldView}>
							<Text style={MainStyles.fieldName}>Date Separator</Text>
							<PickerField
								onValueChange={HandleDateSeparator}
								value={GetValueFromObject(userProfile, 'Date Separator', 'DateSeparator')}
								choices={[
									{ label: '-', value: '-' },
									{ label: '/', value: '/' },
									{ label: '.', value: '.' }
								]}
							/>
						</View>
						{/* <View style={MainStyles.fieldView}>
							<Text style={MainStyles.fieldName}>UI Language</Text>
							<PickerField
								onValueChange={HandleUILanguage}
								value={GetValueFromObject(userProfile, 'UI Language', 'UILanguage')}
								choices={[
									{ label: 'English', value: 'English' },
									{ label: 'Thai', value: 'Thai' }
								]}
							/>
						</View> */}
						<View style={MainStyles.fieldView}>
							<Text style={MainStyles.fieldName}>Time Format</Text>
							<PickerField
								onValueChange={HandleTimeFormat}
								value={GetValueFromObject(userProfile, 'Time Format', 'TimeFormat')}
								choices={[
									{ label: 'h:mm:ss tt', value: 'h:mm:ss tt' },
									{ label: 'h:mm tt', value: 'h:mm tt' },
									{ label: 'hh:mm:ss tt', value: 'hh:mm:ss tt' },
									{ label: 'hh:mm tt', value: 'hh:mm tt' },
									{ label: 'H:mm:ss', value: 'H:mm:ss' },
									{ label: 'H:mm', value: 'H:mm' },
									{ label: 'HH:mm:ss', value: 'HH:mm:ss' },
									{ label: 'HH:mm', value: 'HH:mm' }
								]}
							/>
						</View>
						<View style={MainStyles.fieldView}>
							<Text style={MainStyles.fieldName}>Currency Unit</Text>
							<PickerField
								onValueChange={HandleCurrencyUnit}
								value={GetValueFromObject(userProfile, 'Currency Unit', 'CurrencyUnit')}
								choices={[
									{ label: '$', value: '$' },
									{ label: '฿', value: '฿' }
								]}
							/>
						</View>
						<View style={MainStyles.fieldView}>
							<Text style={MainStyles.fieldName}>Display Time Zone</Text>
							<PickerField
								onValueChange={HandleDisplayTimeZone}
								value={GetValueFromObject(userProfile, 'Display Time Zone', 'DisplayTimeZone')}
								choices={[
									{ label: '-11', value: 'UTC-11:00' },
									{ label: '-10', value: 'UTC-10:00' },
									{ label: '-9', value: 'UTC-09:00' },
									{ label: '-8', value: 'UTC-08:00' },
									{ label: '-7', value: 'UTC-07:00' },
									{ label: '-6', value: 'UTC-06:00' },
									{ label: '-5', value: 'UTC-05:00' },
									{ label: '-4', value: 'UTC-04:00' },
									{ label: '-3', value: 'UTC-03:00' },
									{ label: '-2', value: 'UTC-02:00' },
									{ label: '-1', value: 'UTC-01:00' },
									{ label: '0', value: 'UTC' },
									{ label: '1', value: 'UTC+01:00' },
									{ label: '2', value: 'UTC+02:00' },
									{ label: '3', value: 'UTC+03:00' },
									{ label: '4', value: 'UTC+04:00' },
									{ label: '5', value: 'UTC+05:00' },
									{ label: '6', value: 'UTC+06:00' },
									{ label: '7', value: 'UTC+07:00' },
									{ label: '8', value: 'UTC+08:00' },
									{ label: '9', value: 'UTC+09:00' },
									{ label: '10', value: 'UTC+10:00' },
									{ label: '11', value: 'UTC+11:00' },
									{ label: '12', value: 'UTC+12:00' }
								]}
							/>
						</View>
						{/* <ViewText FieldName="Sample" TextValue={'23-03-2021  07:02 PM'} /> */}
					</Card>
				</View>
			</ScrollView>
		</View>
	);
};

function GetValueFromObject(object, displayName, variableName) {
	if (!object || (!displayName && !variableName)) {
		return '';
	}

	//find by display name
	if (displayName in object) {
		return object[displayName];
	} else if (variableName in object) {
		return object[variableName];
	} else {
		return null;
	}
}

export default AppSetting;
