/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	View,
	Modal,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
	RefreshControl,
	SafeAreaView
} from 'react-native';
import { useForm, FormProvider, Controller } from 'react-hook-form';

import LoadingStyle from '../../../../styles/component/LoadingStyle';
import MainStyles from './../../../../styles/MainStyle';
import SectionStyle from './../../../../styles/component/SectionStyle';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import ThemeColor from '../../../../constants/ThemeColor';
import { FormAutoLookupField } from '../../../../component/FormAutoLookupField';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { FormPickerField } from '../../../../component/FormPickerField';
import { Button } from 'react-native-elements';
import btnStyle from '../../../../styles/component/ButtonStyle';
import { showMessage } from 'react-native-flash-message';
import { HandleErrorMsg } from '../../../../helper/RestClient';
import { ConvertApiName } from '../../../../helper/StringUtils';

const sharingRoleData = {
	Page: 1,
	'Total Records': 24,
	Records: [
		{
			Name: 'FirstRole',
			Value: '1'
		},
		{
			Name: 'SecondRole',
			Value: '2'
		},
		{
			Name: 'ThirdRole',
			Value: '3'
		}
	]
};
const ModuleSharingNew = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = React.useState(false);
	const [sharingRoleList, setSharingRoleList] = React.useState([]);
	const ModuleInfo = React.useContext(ModuleContext);

	const formMethods = useForm();

	const extId = route.params?.ExtId ? route.params?.ExtId : '';

	React.useEffect(() => {
		const selectedModuleName = ModuleInfo.GetModuleInfoState().moduleName;
		const ExtId = ModuleInfo.GetModuleInfoState().detailData?.id;
		navigation.setOptions({
			title: selectedModuleName
				? `${selectedModuleName} - Sharing`
				: `${ModuleInfo.GetModuleInfoState().moduleName} - Sharing`
		});

		//Sharing role list
		function FetchSharingRoleList() {
			if (sharingRoleData) {
				const roleList = sharingRoleData?.Records?.map((record, index) => {
					return { label: record?.Name, value: record?.Value };
				});
				roleList.unshift({ label: '-- Select --', value: '0' });
				setSharingRoleList(roleList);
			}
		}

		async function FetchSharingRoleList() {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: ExtId,
					page: 1,
					size: 100
				});
				let url = `/sharing-role-list?${query.toString()}`;
				await RestClientInstance()
					.get(url)
					.then(
						(resp) => {
							//console.log('FetchSharingRoleList success', resp?.data);
							if (resp?.data) {
								const roleList = resp?.data?.Records?.map((record, index) => {
									return { label: record?.Name, value: record?.Value };
								});
								roleList.unshift({ label: '-- Select --', value: '0' });

								setSharingRoleList(roleList);
							}
						},
						(reject) => {
							console.log('FetchSharingRoleList Reject', reject);
						}
					)
					.catch((errResp) => {
						console.log('FetchSharingRoleList catch', errResp);
					})
					.finally(() => {
						setIsLoading(false);
					});
			} catch (exception) {
				console.log('FetchSharingRoleList exception', exception);
				setIsLoading(false);
			}
		}

		FetchSharingRoleList();
	}, []);

	const onSubmit = async (formData) => {
		setIsLoading(true);
		let newFormData = Object.fromEntries(
			Object.entries(formData).map((data, index) => {
				if (data[0] === 'StartDate') {
					data[1] = data[1].valuePicker;
				}
				return data;
			})
		);

		const query = new URLSearchParams({
			token: userData?.Token,
			id: extId
		});

		const url = `/${ConvertApiName(
			ModuleInfo.GetModuleInfoState().moduleName
		)}/sharing?${query.toString()}`;

		console.log('encode newFormData: ', encodeURI(JSON.stringify(newFormData)));
		console.log('newFormData: ', url, newFormData);

		await RestClientInstance()
			.post(url, newFormData)
			.then(
				(resp) => {
					showMessage({ message: 'Successfully', type: 'success' });
					navigation.pop();
				},
				(reject) => {
					if (reject.response?.data?.Errors) {
						let msg = HandleErrorMsg(reject.response?.data?.Errors);
						console.log('[ModuleSharing] Sharing failed:', msg);
						showMessage({
							message: 'Failed:' + msg,
							type: 'danger',
							duration: 5000
						});
					} else {
						console.log('[ModuleSharing] Sharing failed:', reject);
						showMessage({
							message: 'Failed ' + reject,
							type: 'danger',
							duration: 5000
						});
					}
				}
			)
			.catch((errResp) => {
				console.info('[ModuleSharing] Error', typeof errResp);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onErrors = () => {};
	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<FormProvider {...formMethods}>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<View style={MainStyles.container}>
						<View style={SectionStyle.container}>
							<View style={SectionStyle.header}>
								<Text style={SectionStyle.headerText}>Key Information</Text>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Share To</Text>
								<FormAutoLookupField
									isUserLookup={true}
									name="Share To"
									rules={{ required: 'Input is required!' }}
									defaultValue={''}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Access Level</Text>
								<FormPickerField
									name="Access Level"
									rules={{ required: 'Input is required!' }}
									defaultValue={''}
									choices={[
										{ label: '-- Select --', value: '0' },
										{ label: 'Read Only', value: '1' },
										{ label: 'Read/Edit', value: '2' },
										{ label: 'Full Access', value: '3' }
									]}
								/>
							</View>
							<View style={MainStyles.fieldView}>
								<Text style={MainStyles.requiredFieldName}>Share Role</Text>
								<FormPickerField
									name="Share Role"
									rules={{ required: 'Input is required!' }}
									defaultValue={''}
									choices={sharingRoleList}
								/>
							</View>
						</View>

						<View style={{ flexDirection: 'row', marginTop: 20 }}>
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

export default ModuleSharingNew;
