/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	useWindowDimensions,
	StyleSheet,
	Modal,
	Pressable
} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import SafeAreaView from 'react-native-safe-area-view';
import { Button, Card, Input, ListItem } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import BtnStyle from './../../../../styles/component/ButtonStyle';
import MainStyles from './../../../../styles/MainStyle';
import LoadingStyle from '../../../../styles/component/LoadingStyle';
import SectionStyle from '../../../../styles/component/SectionStyle';

import { FormInputField, InputField } from '../../../../component/FormInputField';
import { FormPickerField } from '../../../../component/FormPickerField';
import { FormDateTimeField } from '../../../../component/FormDateTimeField';
import { FormDateField } from '../../../../component/FormDateField';
import { FormCheckboxField } from '../../../../component/FormCheckboxField';
import { FormAutoLookupField } from '../../../../component/FormAutoLookupField';
import { FormFileBrowserField } from '../../../../component/FormFileBrowserField';
import { FormImagePickerField } from '../../../../component/FormImagePickerField';

import {
	CompareString,
	ConvertApiName,
	IsEmptyOrNullOrUndefined,
	isObjectEmpty
} from '../../../../helper/StringUtils';
import { ConvertStringToDateTime } from '../../../../helper/DateUtils';
import { enableScreens } from 'react-native-screens';
import { SUCCESS_FLAG, ERROR_FLAG, BASE_URL } from '../../../../constants/Globals';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import CacheContext from '../../../../context/CacheContext';
import {
	ValidateSubmitFormData,
	FieldCreator,
	FindFirstPageLayoutById
} from '../ModuleScreenManager';
import NotFoundComponent from '../../../../component/NotFoundComponent';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { showMessage, hideMessage } from 'react-native-flash-message';
import ThemeColor from '../../../../constants/ThemeColor';
import { AddProcedure } from '../procedure/AddProcedureModal';

enableScreens();

export default function ModuleCreate({ navigation, route }) {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const CacheManager = React.useContext(CacheContext);

	const [isLoading, setIsLoading] = React.useState(true);
	const [editFieldsContent, setEditFieldsContent] = React.useState([]);
	const [describe, setDescribe] = React.useState(
		CacheManager.GetDescribe(ModuleInfo.GetModuleInfoState().moduleName)
	);
	const [pageLayout, setPageLayout] = React.useState({});
	const [currentPageLayout, setCurrentPageLayout] = React.useState('');

	const [selectedProcedure, setSelectedProcedure] = React.useState({});

	const screenDimension = useWindowDimensions();

	const NextPage = route.params?.NextPage;
	const PreviousFormData = route.params?.PreviousFormData
		? JSON.parse(route.params?.PreviousFormData)
		: undefined;

	const formMethods = useForm();

	function BindProcedure(newItemId, pcdId) {
		try {
			const query = new URLSearchParams({
				token: userData?.Token,
				id: newItemId,
				pcd_id: pcdId
			});

			const body = {};

			const url = `/${ConvertApiName(
				ModuleInfo.GetModuleInfoState().moduleName
			)}?${query.toString()}`;
			console.log('[Bind-procedure] url', url);
			RestClientInstance()
				.put(url, body)
				.then(
					(resp) => {
						showMessage({ message: 'Procedure binding successfully', type: 'success' });
					},
					(reject) => {
						showMessage({
							message: 'Cannot bind this procedure. ' + reject,
							type: 'danger'
						});
					}
				)
				.catch((errResp) => {
					console.info('[ModuleCreate-Bind-procedure] Error', errResp);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (exception) {
			console.log('[ModuleCreate-Bind-procedure] Catch exception', exception);
			setIsLoading(false);
		}
	}

	const onSubmit = (form) => {
		setIsLoading(true);
		const validatedFormData = ValidateSubmitFormData(
			form,
			ModuleInfo.GetModuleInfoState().describe
		);
		//console.log(validatedFormData);
		try {
			const query = new URLSearchParams({
				token: userData?.Token,
				layoutid: currentPageLayout
			});

			const url = `/${ConvertApiName(
				ModuleInfo.GetModuleInfoState().moduleName
			)}?${query.toString()}`;
			console.log('[Create] url', url);
			RestClientInstance()
				.post(url, validatedFormData)
				.then(
					(resp) => {
						if ('PageName' in resp?.data && 'PageType' in resp?.data) {
							//next page layout
							navigation.replace('ModulePageCreate', {
								NextPage: resp?.data,
								PreviousFormData: JSON.stringify(validatedFormData)
							});
						} else {
							showMessage({ message: 'Your data has been successfully created', type: 'success' });
							if (!isObjectEmpty(selectedProcedure) && describe?.EnableProcedure === true) {
								BindProcedure();
							}
							navigation.replace('ModulePageRoot', {
								ExtId: resp?.data?.Id,
								selectedModuleName: ModuleInfo.GetModuleInfoState().moduleName
							});
						}
					},
					(reject) => {
						showMessage({
							message: 'Your data has been failed created. ' + reject,
							type: 'danger'
						});
					}
				)
				.catch((errResp) => {
					console.info('[ModuleCreate-Onsubmit] Error', errResp);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (exception) {
			console.log('[ModuleCreate-Onsubmit] Catch exception', exception);
			setIsLoading(false);
		}
	};

	const onErrors = (error) => {
		if (error) {
			let requiredFields = `[${Object.entries(error).map(([key, body]) => {
				return `(${key})`;
			})}] are required.`;
			showMessage({ message: requiredFields, type: 'danger', duration: 3000 });
		}
		/* switch (body.type) {
			case "required":
				requiredFields = requiredFields + key + ''
				break;

			default:
				break;
		} */
	};

	function GetModuleDescribe(targetModuleName) {
		const mDescribe = CacheManager.GetDescribe(targetModuleName);

		if (mDescribe) {
			//console.log('Already has Describe, fetch from cache');
			return new Promise(function (resolve, reject) {
				resolve({ data: mDescribe });
			});
		} else {
			//console.log('Have no describe in cache, fetch from api');
			try {
				const query = new URLSearchParams({
					token: userData?.Token
				});
				const url = `/${ConvertApiName(targetModuleName)}/describe?${query.toString()}`;
				return RestClientInstance().get(url);
			} catch (e) {
				console.log(e);
			}
		}
	}

	function FindCurrentLayout(layoutList, pageType) {
		let detailLayout = layoutList.filter(
			(layout) => layout['Page Type'] === pageType && layout['Role Name'] === profile?.Role
		);
		if (detailLayout?.length > 1) {
			return detailLayout?.find(
				(layout) => layout['First Page'] === true || layout['First Page'] === 'true'
			);
		} else {
			return detailLayout[0];
		}
	}

	async function GetModuleRolePageLayoutList(moduleName) {
		if (!IsEmptyOrNullOrUndefined(moduleName)) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token
				});

				const url = `/${ConvertApiName(moduleName)}/page-layouts?${query.toString()}`;

				return await RestClientInstance().get(url);
			} catch (e) {
				console.log(e);
			}
		}
	}

	async function GetModuleRolePageLayoutCreate(moduleName, layoutId) {
		try {
			const query = new URLSearchParams({
				token: userData?.Token,
				id: layoutId
			});
			let url = `/${ConvertApiName(moduleName)}/page-layout?${query.toString()}`;

			await RestClientInstance()
				.get(url)
				.then((response) => {
					setPageLayout(response?.data);
				})
				.catch((error) => {
					console.log('[ModulePageRoot-GetModuleRolePageLayoutDetail] ' + url + ' error', error);
				})
				.finally(() => {});
		} catch (error) {
			console.log('[ModulePageRoot] ', error);
		}
	}

	//First trigger (1)
	React.useEffect(() => {
		const moduleName = ModuleInfo.GetModuleInfoState().moduleName;

		navigation.setOptions({
			title:
				route.params?.create_type === 'clone' ? `${moduleName} - Clone` : `${moduleName} - Create`
		});

		GetModuleDescribe(moduleName).then(
			(response) => {
				if (response?.data) {
					CacheManager.AddDescribeCache(response?.data);
					setDescribe(response?.data);

					let layoutList = ModuleInfo.GetModuleInfoState().pageLayoutList;

					if (!layoutList || layoutList.length <= 0) {
						//Fetch new one
						GetModuleRolePageLayoutList(moduleName).then((layoutResponse) => {
							layoutList = layoutResponse?.data;
							if (layoutList && layoutList.length > 0) {
								ModuleInfo.SetPageLayoutList(layoutList);
							}
						});
					}

					let createLayout = NextPage
						? FindFirstPageLayoutById(layoutList, NextPage?.Id)
						: FindCurrentLayout(
								layoutList,
								route.params?.create_type === 'clone' ? 'Create View' : 'Create View'
						  );

					/* let createLayout = FindCurrentLayout(
						layoutList,
						route.params?.create_type === 'clone' ? 'Create View' : 'Create View'
					); */
					//console.log('createLayout', createLayout);
					if (createLayout && 'id' in createLayout) {
						setCurrentPageLayout(createLayout?.id);
						GetModuleRolePageLayoutCreate(moduleName, createLayout.id);
					} else {
						setIsLoading(false);
					}
				}
			},
			(reject) => {
				console.log('[GetModuleDescribe] reject', reject);
			}
		);

		return () => {
			console.log('[ModuleCreate] clean up');
		};
	}, []);

	React.useEffect(() => {
		if (
			pageLayout &&
			'ModuleName' in pageLayout &&
			ConvertApiName(pageLayout?.ModuleName) ===
				ConvertApiName(ModuleInfo.GetModuleInfoState().moduleName)
		) {
			if (pageLayout?.Layout) {
				const mDetailData = ModuleInfo.GetModuleInfoState().detailData?.data;
				let allFieldsData = {};
				if (mDetailData) {
					const contents = mDetailData.map((dataObj, index) => dataObj.content);
					contents.flatMap((data, index) => Object.assign(allFieldsData, data));
					//console.log('Create Type', route.params?.create_type);
				}

				let SectionContainerList = [];

				pageLayout.Layout.map((layout, sectionIndex) => {
					let contentFieldList = [];

					layout?.Fields.map((fieldName, index) => {
						const childKey = `${sectionIndex}_${index}`;
						const fieldInfo = describe.Fields.find((field) => fieldName === field.Name);
						if (fieldInfo?.Updatable === 'true') {
							const fieldValue =
								route.params?.create_type === 'clone'
									? GetValueFromObject(allFieldsData, fieldName, fieldName)
									: '';
							contentFieldList.push(
								FieldCreator({
									Name: fieldName,
									Value: fieldValue,
									IndexKey: childKey,
									FieldInfo: fieldInfo
								})
							);
						}
					});

					if (contentFieldList?.length > 0) {
						//Create Section Concainer
						SectionContainerList.push(
							<View style={SectionStyle.container} key={sectionIndex}>
								<View style={SectionStyle.header}>
									<Text style={SectionStyle.headerText}>{layout.SectionName}</Text>
								</View>
								{contentFieldList.map((field) => field)}
							</View>
						);
					}
				});

				setEditFieldsContent(SectionContainerList);
				setIsLoading(false);
			}
		}
	}, [pageLayout]);

	const SubmitContainer = (submitProps) => {
		const { rightBtnTitle, rightBtnAction, leftBtnTitle, leftBtnAction } = submitProps;

		return (
			<View style={{ flexDirection: 'row' }}>
				<Button
					title={leftBtnTitle && 'Back'}
					onPress={leftBtnAction}
					type="solid"
					titleStyle={BtnStyle.title}
					buttonStyle={BtnStyle.button}
					containerStyle={BtnStyle.container}
				/>
				<Button
					loading={isLoading}
					loadingProps={{ animating: true }}
					title={rightBtnTitle && 'Save'}
					onPress={rightBtnAction}
					type="solid"
					titleStyle={BtnStyle.title}
					buttonStyle={BtnStyle.button}
					containerStyle={BtnStyle.container}
				/>
			</View>
		);
	};

	const ProcTemplateManage = React.useCallback(() => {
		return (
			<AddProcedure
				recordId=""
				selectedProcedure={selectedProcedure}
				setSelectedProcedure={setSelectedProcedure}
			/>
		);
	}, [selectedProcedure]);

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : isObjectEmpty(pageLayout) ? (
		<NotFoundComponent missingThing="Page Layout" {...{ screenInfo: screenDimension }} />
	) : (
		<FormProvider {...formMethods}>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<View style={MainStyles.container}>
						{editFieldsContent}
						{GetValueFromObject(describe, 'Enable Procedure', 'EnableProcedure') === true ? (
							<ProcTemplateManage />
						) : (
							[]
						)}
						<SubmitContainer
							rightBtnTitle="Save"
							rightBtnAction={formMethods.handleSubmit(onSubmit, onErrors)}
							leftBtnTitle="Back"
							leftBtnAction={() => {
								navigation.goBack();
							}}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</FormProvider>
	);
}

const ProcedureStyles = StyleSheet.create({
	container: {
		marginBottom: 20
	},
	pickerContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		padding: 15
		//borderWidth: 1,
		//borderColor: 'red'
	},
	introduceTxt: {
		fontSize: 14,
		marginVertical: 20
	},
	AddBtn: {
		marginTop: 10
	},
	selectedProcedure: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: ThemeColor.BORDER,
		borderRadius: 10
	}
});
