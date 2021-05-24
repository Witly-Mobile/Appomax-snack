/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, Text } from 'react-native';
import { Input, Button, CheckBox, Card } from 'react-native-elements';
import { useForm, FormProvider } from 'react-hook-form';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { BASE_URL, Copyright_Text } from '../../constants/Globals';
import CheckBoxStyle from '../../styles/component/CheckboxStyle';

import ThemeColor from '../../constants/ThemeColor';
import { FormInputField } from '../../component/FormInputField';
import BaseStyles from './../../styles/component/BaseStyle';
import AuthContext from '../../context/AuthContext';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { CompareString } from '../../helper/StringUtils';
import { HandleErrorMsg } from '../../helper/RestClient';

/*BEGIN - Login Screen*/
const ResetScreen = ({ navigation, route }) => {
	const { RestClientInstance, userData, ManuallyLogOut } = React.useContext(AuthContext);
	const [username, setUsername] = React.useState('');
	const [oldPassword, setOldPassword] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [rememberMe, setRememberMe] = React.useState(false);
	const [iconLoading, setIconLoading] = React.useState(false);

	const isForce = route.params?.isForce ? route.params.isForce : false;

	const formMethods = useForm();
	const { handleSubmit } = formMethods;

	const onSubmit = (form) => {
		//console.log('onSubmit', form);
		AttemptReset(form);
	};

	const onErrors = (errors) => {
		//console.log('onErrors', errors);
		//setLocalErrors[errors];
	};

	/*BEGIN - React hook */
	React.useEffect(() => {
		return () => {
			setIconLoading(false);
		};
	}, [iconLoading]);
	/*END - React hook */

	return (
		<View style={{ flex: 1 }}>
			<Card containerStyle={{}} wrapperStyle={{}}>
				<Card.Title
					h4
					h4style={{ fontSize: 16 }}
					style={[{ alignSelf: 'flex-start' }, BaseStyles.baseText]}>
					Key Information
				</Card.Title>
				<Card.Divider style={{ margin: 0 }} />
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<FormProvider {...formMethods}>
						<FormInputField
							name="oldPassword"
							iconName="lock"
							placeholder="Old Password"
							isSecure={true}
							//defaultValue={'123456'}
							rules={{
								required: 'Old Password is required!',
								minLength: {
									message: 'Use at least 6 characters.',
									value: 6
								}
							}}
						/>
						<FormInputField
							name="newPassword"
							iconName="lock"
							placeholder="New Password"
							isSecure={true}
							rules={{
								required: 'New Password is required!',
								minLength: {
									message: 'Use at least 6 characters.',
									value: 6
								}
							}}
						/>
						<FormInputField
							name="confirmPassword"
							iconName="lock"
							placeholder="Confirm Password"
							isSecure={true}
							rules={{
								required: 'Confirm Password is required!',
								minLength: {
									message: 'Use at least 6 characters.',
									value: 6
								}
							}}
						/>
					</FormProvider>
				</KeyboardAvoidingView>
				<View style={{}}>
					<Button
						type="solid"
						title="Submit"
						loading={iconLoading}
						loadingProps={{ animating: true }}
						titleStyle={btnStyle.title}
						buttonStyle={btnStyle.button}
						containerStyle={btnStyle.container}
						onPress={handleSubmit(onSubmit, onErrors)}
					/>
				</View>
			</Card>
		</View>
	);

	/*BEGIN - Functions*/
	async function AttemptReset(formData) {
		setIconLoading(true);

		let isMatch = CompareString(formData.newPassword, formData.confirmPassword);
		console.log(
			'formData.oldPassword, formData.newPassword',
			formData.newPassword,
			formData.confirmPassword,
			'| isMatch',
			isMatch
		);
		if (isMatch !== 0) {
			showMessage({ message: 'Both password are not match.', type: 'danger' });
			return;
		}

		const resetPwdData = {
			user: userData?.Username,
			oldPassword: formData.oldPassword,
			newPassword: formData.newPassword
		};

		try {
			let query = new URLSearchParams({
				token: userData?.Token
			});
			const url = BASE_URL + 'reset-pwd?' + query.toString();
			console.log('url', url, 'resetPwdData', resetPwdData);

			await RestClientInstance()
				.put(url, resetPwdData)
				.then(
					(response) => {
						// handle success
						showMessage({
							message: 'Reset password has successfully.',
							type: 'success',
							duration: 5000
						});
						if (isForce) {
							//force user to change password
							ManuallyLogOut();
						} else {
							navigation.pop();
						}
					},
					(reject) => {
						// handle reject
						if (reject.response?.data?.Errors) {
							let msg = HandleErrorMsg(reject.response?.data?.Errors);
							showMessage({
								message: 'Reset password has failed:' + msg,
								type: 'danger',
								duration: 5000
							});
						} else {
							showMessage({
								message: 'Reset password has failed because ' + reject,
								type: 'danger',
								duration: 5000
							});
						}
					}
				)
				.catch(function (error) {
					// handle error
					showMessage({ message: 'Internal error:' + error, type: 'error' });
				})
				.then(function () {
					// always executed
				});
		} catch (e) {
			console.log(e);
		}
	}
	/*END - Functions*/
};

/*END - Login Screen*/

/*BEGIN - Style*/

const resetStyle = StyleSheet.create({
	resetContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF'
	}
});

const btnStyle = StyleSheet.create({
	container: {
		borderRadius: 5,
		backgroundColor: ThemeColor.PRIMARY
	},
	button: {
		height: 50
	},
	title: {
		fontSize: 16
	}
});

const copyright = StyleSheet.create({
	copyrightLabel: {
		color: ThemeColor.TEXT,
		fontSize: 12,
		textAlign: 'center',
		backgroundColor: '#fff',
		paddingBottom: 10
	}
});
/*END - Style*/

export default ResetScreen;
