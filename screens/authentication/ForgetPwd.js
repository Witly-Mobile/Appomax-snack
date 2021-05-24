/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, Text } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import { useForm, FormProvider } from 'react-hook-form';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { BASE_URL, Copyright_Text } from '../../constants/Globals';
import CheckBoxStyle from '../../styles/component/CheckboxStyle';

import ThemeColor from '../../constants/ThemeColor';
import { FormInputField } from '../../component/FormInputField';

import AuthContext from '../../context/AuthContext';
import { showMessage, hideMessage } from 'react-native-flash-message';

/*BEGIN - Login Screen*/
const ForgetScreen = ({ navigation }) => {
	const { RestClientInstance } = React.useContext(AuthContext);
	const [username, setUsername] = React.useState('');
	const [rememberMe, setRememberMe] = React.useState(false);
	const [isLoading, SetIsLoading] = React.useState(false);
	const [localErrors, setLocalErrors] = React.useState([]);

	const { forget } = {};

	const formMethods = useForm();
	const { handleSubmit } = formMethods;

	const onSubmit = (form) => {
		//console.log('onSubmit', form);
		AttemptForget(form);
	};

	const onErrors = (errors) => {
		//console.log('onErrors', errors);
		//setLocalErrors[errors];
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={forgetStyle.forgetContainer}>
				<Image
					resizeMode="center"
					source={require('./../../assets/logo/Icon-512.png')}
					style={{ width: '100%', height: 200 }}
				/>
				<View
					style={{
						width: '100%',
						paddingHorizontal: 40
					}}>
					<Text style={{ marginBottom: 20 }}>
						Please, enter your username. You will receive new temporary password via email.
					</Text>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						<FormProvider {...formMethods}>
							<FormInputField
								disabled={isLoading}
								name="username"
								//iconName="account-circle"
								placeholder="Username"
								rules={{ required: 'Username is required!' }}
								defaultValue={''}
							/>
						</FormProvider>
					</KeyboardAvoidingView>
					<View style={{}}>
						<Button
							type="solid"
							title="Send Request"
							loading={isLoading}
							loadingProps={{ animating: true }}
							titleStyle={btnStyle.title}
							buttonStyle={btnStyle.button}
							containerStyle={btnStyle.container}
							onPress={handleSubmit(onSubmit, onErrors)}
						/>
					</View>

					<Button
						type="outline"
						title="Try to log in."
						titleStyle={{}}
						buttonStyle={{
							height: 40
						}}
						containerStyle={{ marginTop: 15 }}
						onPress={() => navigation.navigate('Login')}
					/>
				</View>
			</View>
			<Text style={copyright.copyrightLabel}>{Copyright_Text}</Text>
		</View>
	);

	/*BEGIN - Functions*/
	async function AttemptForget(formData) {
		SetIsLoading(true);
		try {
			const url = BASE_URL + 'forgot-pwd';

			await RestClientInstance()
				.put('/forgot-pwd', { user: formData?.username })
				.then(
					(response) => {
						// handle success
						//console.log(response);
						showMessage({ message: 'We received your request.', type: 'success', duration: 5000 });
						//forget(response.data);
					},
					(reject) => {
						// handle success
						console.log(reject);
						showMessage({
							message: 'Cannot send request.' + reject,
							type: 'danger',
							duration: 5000
						});
						//forget(response.data);
					}
				)
				.catch(function (error) {
					// handle error
					console.log('Exception axios.get', error, 'url', url);
					showMessage({ message: 'Not found the username.', type: 'danger', duration: 5000 });
				})
				.finally(function () {
					// always executed
					SetIsLoading(false);
				});
		} catch (e) {
			console.log(e);
		}
	}
	/*END - Functions*/
};

/*END - Login Screen*/

/*BEGIN - Style*/

const forgetStyle = StyleSheet.create({
	forgetContainer: {
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

export default ForgetScreen;
