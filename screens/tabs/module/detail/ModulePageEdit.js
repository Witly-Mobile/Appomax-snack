/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import SafeAreaView from 'react-native-safe-area-view';
import { Button } from 'react-native-elements';

import BtnStyle from './../../../../styles/component/ButtonStyle';
import MainStyles from './../../../../styles/MainStyle';
import LoadingStyle from '../../../../styles/component/LoadingStyle';
import SectionStyle from '../../../../styles/component/SectionStyle';

import { FormInputField } from '../../../../component/FormInputField';
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
import { SUCCESS_FLAG } from '../../../../constants/Globals';
import { showMessage, hideMessage } from 'react-native-flash-message';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import CacheContext from '../../../../context/CacheContext';
import {
	FindFirstPageLayoutById,
	FindFirstPageLayoutByType,
	ValidateSubmitFormData
} from '../ModuleScreenManager';
import NotFoundComponent from '../../../../component/NotFoundComponent';
import { AddProcedure } from '../procedure/AddProcedureModal';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';

enableScreens();

const editFormInitial = {
	currentPage: null,
	previousPage: null,
	nextPage: null,
	formState: null
};

function EditFormReducer(prevState, action) {
	switch (action.type) {
		case 'INIT_FORM_STATE':
			return {
				...prevState,
				formState: action.data
			};
		case 'SET_FORM_NAVIGATION':
			return {
				...prevState,
				currentPage: action.data.currentPage,
				previousPage: action.data.previousPage,
				nextPage: action.data.nextPage
			};
		default:
			break;
	}
}

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

const ModuleEdit = ({ navigation, route }) => {
	const ModuleInfo = React.useContext(ModuleContext);
	const CacheManager = React.useContext(CacheContext);
	const currentPageType = 'Edit View';
	const [editFormState, editFormDispatch] = React.useReducer(EditFormReducer, editFormInitial);
	const [pageLayoutEdit, setPageLayoutEdit] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(true);
	const [pageLayout, setPageLayout] = React.useState({});

	const [describe, setDescribe] = React.useState(
		CacheManager.GetDescribe(ModuleInfo.GetModuleInfoState().moduleName)
	);

	const [editFieldsContent, setEditFieldsContent] = React.useState([]);

	const { RestClientInstance, userData } = React.useContext(AuthContext);

	const screenDimension = useWindowDimensions();

	const formMethods = useForm();

	const [selectedProcedure, setSelectedProcedure] = React.useState({});

	const NextPage = route.params?.NextPage;
	const PreviousFormData = route.params?.PreviousFormData
		? JSON.parse(route.params?.PreviousFormData)
		: undefined;

	const onSubmit = (form) => {
		let mFullDetail = ModuleInfo.GetModuleInfoState().detailData;
		const mDescribe = CacheManager.GetDescribe(ModuleInfo.GetModuleInfoState().moduleName);

		let allFieldsData = {};
		const contents = mFullDetail?.data?.map((dataObj, index) => dataObj.content);
		contents.flatMap((data, index) => Object.assign(allFieldsData, data));

		const validatedFormData = ValidateSubmitFormData(form, mDescribe);

		const ModifiedFields = Object.fromEntries(
			Object.entries(validatedFormData)
				?.map(([newFieldName, newValue]) => {
					if (newFieldName in allFieldsData) {
						let oldValue = allFieldsData[newFieldName];
						if (CompareString(oldValue, newValue) !== 0) {
							return [newFieldName, newValue];
						}
					}
				})
				?.filter((data) => data)
		);

		const query = new URLSearchParams({
			token: userData?.Token,
			id: mFullDetail?.id,
			layoutid: pageLayout?.id
		});

		if (GetValueFromObject(describe, 'Enable Procedure', 'EnableProcedure') === true) {
			query.append('pcd_id', selectedProcedure?.id);
		}

		const url = `/${ConvertApiName(
			ModuleInfo.GetModuleInfoState().moduleName
		)}?${query.toString()}`;

		RestClientInstance()
			.put(url, ModifiedFields)
			.then(
				(resp) => {
					console.log('Updating success', resp?.data);
					//ModuleInfo.SetActionResult({
					//	status: SUCCESS_FLAG,
					//	message: "'Your data has been successfully updated'"
					//});
					showMessage({ message: 'Your data has been successfully updated', type: 'success' });

					if (isObjectEmpty(resp?.data) || IsEmptyOrNullOrUndefined(resp?.data)) {
						navigation.replace('ModulePageRoot', {
							ExtId: mFullDetail?.id,
							selectedModuleName: ModuleInfo.GetModuleInfoState().moduleName
						});
					} else {
						//next page layout
						navigation.replace('ModulePageEdit', {
							NextPage: resp?.data,
							PreviousFormData: JSON.stringify(validatedFormData)
						});
					}
				},
				(reject) => {
					showMessage({ message: `Your data has been failed updated ${reject}`, type: 'danger' });
				}
			)
			.catch((errResp) => {
				console.info('[ModuleEdit-Onsubmit] Error', errResp);
			})
			.finally(() => {});
	};

	const onErrors = (errors) => {
		console.log('onErrors', errors);
	};

	//(1)
	React.useEffect(() => {
		const moduleName = ModuleInfo.GetModuleInfoState().moduleName;

		navigation.setOptions({
			title: moduleName === '' ? 'View' : `${moduleName} - Edit`
		});

		async function FetchModulePageLayoutEdit(pageLayoutId) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: pageLayoutId
				});
				let url = `/${ConvertApiName(moduleName)}/page-layout?${query.toString()}`;
				return await RestClientInstance().get(url);
			} catch (error) {
				console.log('[ModulePageRoot] ', error);
			}
		}

		//Execute
		const EditPageLayout = NextPage
			? FindFirstPageLayoutById(ModuleInfo.GetModuleInfoState().pageLayoutList, NextPage?.Id)
			: FindFirstPageLayoutByType(ModuleInfo.GetModuleInfoState().pageLayoutList, currentPageType);
		setPageLayout(EditPageLayout);

		//	console.log(NextPage?.Id === EditPageLayout?.id);

		FetchModulePageLayoutEdit(EditPageLayout?.id)
			.then(
				(response) => {
					PrepareEditFields(response?.data);
				},
				(reject) => {
					console.log('(Reject)Edit page layout detail', reject);
				}
			)
			.catch((error) => {
				console.log('(catch)Edit page layout detail', error);
			})
			.finally(() => {});

		setDescribe(CacheManager.GetDescribe(ModuleInfo.GetModuleInfoState().moduleName));
		return () => {};
	}, []);

	function PrepareEditFields(EditLayout) {
		if (!isObjectEmpty(EditLayout)) {
			const mDetailData = ModuleInfo.GetModuleInfoState().detailData?.data;
			const mDescribe = CacheManager.GetDescribe(ModuleInfo.GetModuleInfoState().moduleName);

			if (EditLayout?.Layout) {
				let SectionContainerList = [];

				EditLayout.Layout.map((layout, sectionIndex) => {
					let contentFieldList = [];
					let allFieldsData = {};
					const contents = mDetailData.map((dataObj, index) => dataObj.content);
					contents.flatMap((data, index) => Object.assign(allFieldsData, data));

					layout?.Fields.map((fieldName, index) => {
						const childKey = `${sectionIndex}_${index}`;
						const fieldInfo = mDescribe.Fields.find((field) => fieldName === field.Name);

						if (fieldInfo?.Updatable === 'true') {
							let fieldValue = '';
							if (PreviousFormData) {
								//from previous screen flow
								fieldValue = PreviousFormData[fieldName];
							} else {
								fieldValue = allFieldsData[fieldName];
							}

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
					//Create Section Concainer
					SectionContainerList.push(
						<View style={SectionStyle.container} key={sectionIndex}>
							<View style={SectionStyle.header}>
								<Text style={SectionStyle.headerText}>{layout.SectionName}</Text>
							</View>
							{contentFieldList.map((field) => field)}
						</View>
					);

					setEditFieldsContent(SectionContainerList);
				});
			}
		}
	}

	React.useEffect(() => {
		let mFullDetail = ModuleInfo.GetModuleInfoState().detailData;
		async function GetProcedureDetail(externalId) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: externalId
				});
				let url = `/${ConvertApiName(
					ModuleInfo.GetModuleInfoState().moduleName
				)}/procedure?${query.toString()}`;

				await RestClientInstance()
					.get(url)
					.then(
						(resp) => {
							//console.log('GetProcedureDetail', resp?.data);
							setSelectedProcedure(resp?.data);
						},
						(reject) => {
							//console.log('GetProcedureDetail Reject', reject);
						}
					)
					.catch((errResp) => {
						//console.log('GetProcedureDetail catch', errResp);
					})
					.finally(() => {});
			} catch (exception) {
				//console.log('GetProcedureDetail exception', exception);
			}
		}

		GetProcedureDetail(mFullDetail?.id);
	}, []);

	React.useEffect(() => {
		//After prepare fields
		setIsLoading(false);
	}, [editFieldsContent]);

	function FieldCreator({ Name, Value, IndexKey, FieldInfo }) {
		const { Type, Required } = FieldInfo;
		let inputField = null;
		if (
			[
				'Text',
				'TextArea',
				'Text Editor',
				'Number',
				'AutoNumber',
				'TinyNumber',
				'Decimal',
				'Currency',
				'Email',
				'URL'
			].includes(Type)
		) {
			const requiredRule = Required === 'true' ? { required: 'Input is required!' } : {};
			inputField = <FormInputField name={Name} rules={requiredRule} defaultValue={Value} />;
		} else if (['Lookup'].includes(Type)) {
			inputField = <FormAutoLookupField name={Name} rules={null} defaultValue={Value} />;
		} else if (['Picklist'].includes(Type)) {
			const listOptions = Array.from(FieldInfo['List Value']).flatMap((option) => {
				if (typeof option === 'object') {
					return { label: option?.Name, value: option };
				} else {
					return { label: option, value: option };
				}
			});
			//add default choice
			listOptions.unshift({ label: '-- Select --', value: '0' });

			inputField = (
				<FormPickerField name={Name} rules={null} defaultValue={Value} choices={listOptions} />
			);
		} else if (['DateTime'].includes(Type)) {
			inputField = (
				<FormDateTimeField
					name={Name}
					rules={null}
					defaultValue={{
						showDatePicker: false,
						showTimePicker: false,
						valuePicker: ConvertStringToDateTime(Value)
					}}
				/>
			);
		} else if (['Date'].includes(Type)) {
			inputField = (
				<FormDateField
					name={Name}
					rules={null}
					defaultValue={{
						showPicker: false,
						valuePicker: ConvertStringToDateTime(Value)
					}}
				/>
			);
		} else if (['Checkbox'].includes(Type)) {
			inputField = <FormCheckboxField name={Name} rules={null} defaultValue={Value} />;
		} else if (['File'].includes(Type)) {
			inputField = <FormFileBrowserField name={Name} rules={null} defaultValue={Value} />;
		} else if (['Image'].includes(Type)) {
			inputField = <FormImagePickerField name={Name} rules={null} defaultValue={Value} />;
		}

		return (
			<View key={IndexKey} style={MainStyles.fieldView}>
				<Text style={MainStyles.fieldName}>{Name}</Text>
				{inputField}
			</View>
		);
	}

	const ProcTemplateManage = React.useCallback(() => {
		console.log(selectedProcedure);
		const mDetail = ModuleInfo.GetModuleInfoState().detailData;
		return GetValueFromObject(describe, 'Enable Procedure', 'EnableProcedure') === true ? (
			<AddProcedure
				recordId={mDetail?.id}
				selectedProcedure={selectedProcedure}
				setSelectedProcedure={setSelectedProcedure}
			/>
		) : (
			[]
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
};

export default ModuleEdit;
