/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
	Image,
	Text,
	useWindowDimensions,
	ActivityIndicator
} from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import { useForm, FormProvider } from 'react-hook-form';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import AuthContext from '../../context/AuthContext';
import { BASE_URL, Copyright_Text } from './../../constants/Globals';
import CheckBoxStyle from '../../styles/component/CheckboxStyle';

import { RestClient } from '../../helper/RestClient';
import ThemeColor from '../../constants/ThemeColor';
import { FormInputField } from '../../component/FormInputField';
import LoadingStyle from '../../styles/component/LoadingStyle';
import { showMessage, hideMessage } from 'react-native-flash-message';
import axios from 'axios';

/*BEGIN - Login Screen*/
const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [rememberMe, setRememberMe] = React.useState(false);
	const [iconLoading, setIconLoading] = React.useState(false);
	const [localErrors, setLocalErrors] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	const { RestClientInstance, login } = React.useContext(AuthContext);
	const screenDimension = useWindowDimensions();

	const formMethods = useForm();
	const { handleSubmit } = formMethods;

	const onSubmit = (form) => {
		setIsLoading(true);
		AttemptLoggingIn(form);
	};

	const onErrors = (errors) => {
		//console.log('onErrors', errors);
		//setLocalErrors[errors];
	};

	const CancelToken = axios.CancelToken;
	let cancel;

	return (
		<View style={{ flex: 1 }}>
			<View style={loginStyle.loginContainer}>
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
					<View style={LoadingStyle.modalBackground}>
						<View style={[LoadingStyle.loading_horizontal]}>
							<ActivityIndicator animating={false} size={40} color="#3398ea" />
						</View>
					</View>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						<FormProvider {...formMethods}>
							<FormInputField
								disabled={isLoading}
								name="username"
								iconName="account-circle"
								placeholder="Username"
								rules={{ required: 'Username is required!' }}
								defaultValue={'deveasset'}
							/>
							<FormInputField
								disabled={isLoading}
								name="password"
								iconName="lock"
								placeholder="Password"
								isSecure={true}
								defaultValue={'password'}
								rules={{
									required: 'Password is required!',
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
							title="Login"
							loading={isLoading}
							loadingProps={{ animating: true }}
							titleStyle={btnStyle.title}
							buttonStyle={btnStyle.button}
							containerStyle={btnStyle.container}
							onPress={handleSubmit(onSubmit, onErrors)}
						/>
						{/* <CheckBox
							title="Remember me"
							checkedColor={ThemeColor.PRIMARY}
							size={30}
							checked={rememberMe}
							onPress={() => setRememberMe(!rememberMe)}
							containerStyle={CheckBoxStyle.container}
							textStyle={CheckBoxStyle.text}
						/> */}
						{/* <View style={{ marginTop: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
							<Button
								type="outline"
								title="Forgot password"
								titleStyle={{}}
								buttonStyle={{
									height: 40
								}}
								containerStyle={{}}
								onPress={() => navigation.navigate('ForgotPwd')}
							/>
						</View> */}
						<Button
							type="outline"
							title="Forgot password"
							titleStyle={{}}
							buttonStyle={{
								marginTop: 20,
								height: 40
							}}
							containerStyle={{}}
							onPress={() => navigation.navigate('ForgotPwd')}
						/>
					</View>
				</View>
			</View>
			<Text style={copyright.copyrightLabel}>{Copyright_Text}</Text>
		</View>
	);

	/*BEGIN - Functions*/
	async function AttemptLoggingIn(formData) {
		setIconLoading(true);

		try {
			let query = new URLSearchParams({
				user: formData?.username === '' ? 'witlyadmin' : formData?.username,
				pwd: formData?.password === '' ? 'password' : formData?.password
			});
			const url = BASE_URL + 'login?' + query.toString();
			console.log('Login url', url);
			await RestClient()
				.get(url, {
					cancelToken: new CancelToken((c) => {
						// An executor function receives a cancel function as a parameter
						cancel = c;
					})
				})
				.then(
					(response) => {
						// handle success
						//console.log('[Login.js] Response axios.get', response, 'url', url);
						login(response.data);
					},
					(reject) => {
						console.log('[Login.js] Rejected axios.get', reject, 'url', url);
						showMessage({ message: `Login failed. ${reject}`, type: 'danger' });
						setIsLoading(false);
					}
				)
				.catch(function (error) {
					// handle error
					console.log('[Login.js] Exception axios.get', error, 'url', url);
					setIsLoading(false);
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

const loginStyle = StyleSheet.create({
	loginContainer: {
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

export default LoginScreen;
