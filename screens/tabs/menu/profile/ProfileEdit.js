/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import SafeAreaView from 'react-native-safe-area-view';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import ThemeColor from '../../../../constants/ThemeColor';
import { UserDescribeAPI } from '../../../../helper/MockWitlyAPI';
import { FormInputField } from '../../../../component/FormInputField';
import { DoneMessageBox, ErrorMessageBox } from '../../../../component/MessageBox';

import btnStyle from '../../../../styles/component/ButtonStyle';
import MainStyles from './../../../../styles/MainStyle';
import SectionStyle from '../../../../styles/component/SectionStyle';
import { FormPickerField } from '../../../../component/FormPickerField';
import { FormAutoLookupField } from '../../../../component/FormAutoLookupField';
import { FormImagePickerField } from '../../../../component/FormImagePickerField';
import { FormDateField } from '../../../../component/FormDateField';
import { ConvertStringToDateTime } from '../../../../helper/DateUtils';
import { ConvertApiName } from '../../../../helper/StringUtils';
import { RestClient } from '../../../../helper/RestClient';
import { SUCCESS_FLAG } from '../../../../constants/Globals';

const ProfileEdit = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const AuthActionContext = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);

	const [isLoading, setIsLoading] = React.useState(false);
	const [statusBadge, setStatusBadge] = React.useState();
	const [userDescribe, setUserDescribe] = React.useState({});

	const formMethods = useForm();

	const onSubmit = async (formData) => {
		async function FetchUserProfile() {
			let query = new URLSearchParams({
				token: userData?.Token
			});

			await RestClientInstance()
				.get('/profile?' + query.toString())
				.then(function (response) {
					//console.log('[ProfileEdit] FetchUserProfile - success', response.data);
					AuthActionContext.setProfile(response.data);
					ModuleInfo.SetActionResult({
						status: SUCCESS_FLAG,
						message: "'Your data has been successfully updated'"
					});
					navigation.navigate('ProfileDetail');
				})
				.catch(function (error) {
					// handle error
					console.info('Exception axios.get', error);
				})
				.finally(function () {
					// always executed
				});
		}

		let newFormData = Object.fromEntries(
			Object.entries(formData).map((data, index) => {
				if (data[0] === 'StartDate') {
					data[1] = data[1].valuePicker;
				}
				return data;
			})
		);

		//console.log('Before update profile', newFormData);

		const query = new URLSearchParams({
			token: userData?.Token,
			userid: profile?.id
		});

		const url = `/profile?${query.toString()}`;

		await RestClientInstance()
			.put(url, newFormData)
			.then((resp) => {
				FetchUserProfile();
			})
			.catch((errResp) => {
				console.info('[ModuleEdit-Onsubmit] Error', typeof errResp);
				let badge = <ErrorMessageBox message={'' + errResp} SetStatusBadge={setStatusBadge} />;
				setStatusBadge(badge);
			})
			.finally(() => {});
	};
	const onErrors = (errors) => {
		console.log('onErrors', errors);
	};

	React.useEffect(() => {}, []);

	return (
		<FormProvider {...formMethods}>
			<SafeAreaView style={{ flex: 1 }}>
				{statusBadge}
				<ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<View style={MainStyles.container}>
						<View style={SectionStyle.container}>
							<View style={SectionStyle.header}>
								<Text style={SectionStyle.headerText}>Key Information</Text>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>User name *</Text>
								<FormInputField
									name="Username"
									rules={{ required: 'Input is required!' }}
									defaultValue={GetValueFromObject(profile, 'User name', 'Username')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Role *</Text>
								<FormPickerField
									name="Role"
									rules={{}}
									defaultValue={GetValueFromObject(profile, 'Role', 'Role')}
									choices={[
										{ label: '-- Select --', value: '0' },
										{ label: 'Administrator', value: 'Administrator' },
										{ label: 'Guest', value: 'Guest' }
									]}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.fieldName}>Report To</Text>
								<FormAutoLookupField
									isUserLookup={true}
									name="ReportTo"
									rules={{}}
									defaultValue={GetValueFromObject(profile, 'Report To', 'ReportTo')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.fieldName}>Organization</Text>
								<FormPickerField
									name="Organization"
									rules={{}}
									defaultValue={GetValueFromObject(profile, 'Organization', 'Organization')}
									choices={[
										{ label: '-- Select --', value: '0' },
										{ label: 'DROS', value: 'DROS' }
									]}
								/>
							</View>
						</View>
						<View style={SectionStyle.container}>
							<View style={SectionStyle.header}>
								<Text style={SectionStyle.headerText}>Profile Information</Text>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.fieldName}>Title</Text>
								<FormPickerField
									name="Title"
									rules={{}}
									defaultValue={GetValueFromObject(profile, 'Title', 'Title')}
									choices={[{ label: '-- Select --', value: '0' }]}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>First Name *</Text>
								<FormInputField
									name="FirstName"
									rules={{ required: 'Input is required!' }}
									defaultValue={GetValueFromObject(profile, 'First Name', 'FirstName')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Last Name *</Text>
								<FormInputField
									name="LastName"
									rules={{ required: 'Input is required!' }}
									defaultValue={GetValueFromObject(profile, 'Last Name', 'LastName')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Email *</Text>
								<FormInputField
									name="Email"
									rules={{ required: 'Input is required!' }}
									defaultValue={GetValueFromObject(profile, 'Email', 'Email')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Employee Code *</Text>
								<FormInputField
									name="EmployeeCode"
									rules={{ required: 'Input is required!' }}
									defaultValue={GetValueFromObject(profile, 'Employee Code', 'EmployeeCode')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.fieldName}>Profile Picture</Text>
								<FormImagePickerField
									name="ProfilePicture"
									rules={{}}
									defaultValue={GetValueFromObject(profile, 'Profile Picture', 'ProfilePicture')}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.fieldName}>Signature Image</Text>
								<FormImagePickerField
									name="SignatureImage"
									rules={{}}
									defaultValue={GetValueFromObject(profile, 'Signature Image', 'SignatureImage')}
								/>
							</View>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Button
								title="Back"
								onPress={() => {
									navigation.goBack();
								}}
								type="solid"
								titleStyle={btnStyle.title}
								buttonStyle={btnStyle.button}
								containerStyle={btnStyle.container}
							/>
							<Button
								title="Save"
								onPress={formMethods.handleSubmit(onSubmit, onErrors)}
								type="solid"
								titleStyle={btnStyle.title}
								buttonStyle={btnStyle.button}
								containerStyle={btnStyle.container}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</FormProvider>
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

export default ProfileEdit;
