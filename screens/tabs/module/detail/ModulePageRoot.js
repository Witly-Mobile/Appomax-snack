/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	RefreshControl
} from 'react-native';
import { Button, ListItem, Card } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { useFocusEffect } from '@react-navigation/native';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import CacheContext from '../../../../context/CacheContext';

import { useForm, FormProvider } from 'react-hook-form';

import {
	ConvertApiName,
	IsEmptyOrNullOrUndefined,
	isObjectEmpty
} from '../../../../helper/StringUtils';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Globals, {
	DateTimeOptions,
	ERROR_FLAG,
	ERROR_UPDATE,
	SUCCESS_FLAG,
	SUCCESS_UPDATE
} from '../../../../constants/Globals';
import LoadingStyle from '../../../../styles/component/LoadingStyle';
import MainStyles from '../../../../styles/MainStyle';
import { ViewText, ViewTextBadge } from '../../../../component/ViewText';
import SectionStyle from '../../../../styles/component/SectionStyle';
import { ViewImage } from '../../../../component/ViewImage';
import { ViewFile } from '../../../../component/ViewFile';
import { DoneMessageBox, ErrorMessageBox } from '../../../../component/MessageBox';
import { FloatingButton } from '../../../../component/MyFloatingButton';
import ThemeColor from '../../../../constants/ThemeColor';
import { BottomSheetListComponent } from '../../../../component/BottomSheetComponent';
import { showMessage } from 'react-native-flash-message';
import { EditProcedureFieldComponent } from '../procedure/QuickUpdateProcedureField';
import { FormCheckboxField } from '../../../../component/FormCheckboxField';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { ViewQRCode } from '../../../../component/ViewQRCode';
import { FormPickerField } from '../../../../component/FormPickerField';
import { PICK_LIST } from '../../../../constants/FieldType';

const ModulePageRoot = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const CacheManager = React.useContext(CacheContext);

	const [currentModule, setCurrentModule] = React.useState(
		ModuleInfo.GetModuleInfoState().moduleName
	);

	const [moduleDetail, setModuleDetail] = React.useState({});
	const [describe, setDescribe] = React.useState({});
	const [pageLayoutList, setPageLayoutList] = React.useState([]);
	const [pageLayoutDetail, setPageLayoutDetail] = React.useState({});
	const [mappedDetail, setMappedDetail] = React.useState({});
	const [refreshing, setRefreshing] = React.useState(false);

	const { ExtId, selectedModuleName } = route.params;
	const [currentPageType, setCurrentPageType] = React.useState('Detail View');
	const [statusBadge, SetStatusBadge] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);

	const [SectionComponent, setSectionComponent] = React.useState(<></>);
	const [actions, setActions] = React.useState([]);

	//Procedure
	const [procedureDetail, setProcedureDetail] = React.useState(null);

	const formMethods = useForm();

	React.useEffect(() => {
		return () => {
			//console.log('[ModulePageRoot] clean up before go out from screen');
			setCurrentModule();
		};
	}, []);

	React.useEffect(() => {
		//console.log('[ModulePageRoot] useEffect 01 - set Title');

		navigation.setOptions({
			title: selectedModuleName
				? `${selectedModuleName} - Detail`
				: `${ModuleInfo.GetModuleInfoState().moduleName} - Detail`
		});

		setCurrentModule(selectedModuleName);
	}, [selectedModuleName, navigation]);

	React.useEffect(() => {
		//console.log('[ModulePageRoot] useEffect 02 - Prepare Data');

		async function GetModuleActionList(location, pageLayoutId) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: pageLayoutId,
					location: location
				});
				const url = `/${ConvertApiName(currentModule)}/action?${query.toString()}`;
				//console.log('[ModulePageRoot] GetModuleActionList url - ', url);

				return await RestClientInstance().get(url);
			} catch (e) {
				console.log(e);
			}
		}

		async function GetModuleRolePageLayoutList(moduleName) {
			if (!IsEmptyOrNullOrUndefined(moduleName)) {
				try {
					const query = new URLSearchParams({
						token: userData?.Token
					});

					const url = `/${ConvertApiName(moduleName)}/page-layouts?${query.toString()}`;
					//console.log('[ModulePageRoot] GetModuleRolePageLayoutList url - ', url);

					return await RestClientInstance().get(url);
				} catch (e) {
					console.log(e);
				}
			}
		}

		async function GetModuleRolePageLayoutDetail(layoutId) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: layoutId
				});
				let url = `/${ConvertApiName(currentModule)}/page-layout?${query.toString()}`;
				//console.log('[ModulePageRoot] GetModuleRolePageLayoutDetail url - ', url);

				await RestClientInstance()
					.get(url)
					.then((response) => {
						//console.log('GetModuleRolePageLayoutDetail', response?.data);
						setPageLayoutDetail(response?.data);
					})
					.catch((error) => {
						console.log('[ModulePageRoot-GetModuleRolePageLayoutDetail] ' + url + ' error', error);
					})
					.finally(() => {});
			} catch (error) {
				console.log('[ModulePageRoot] ', error);
			}
		}

		async function GetModuleDetail(id) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: id
				});
				let url = `/${ConvertApiName(currentModule)}?${query.toString()}`;

				return await RestClientInstance().get(url);
			} catch (e) {
				console.log(e);
			}
		}

		function GetModuleDescribe(targetModuleName) {
			const mDescribe = CacheManager.GetDescribe(targetModuleName);

			if (mDescribe) {
				//console.log('Already has Describe, fetch from cache');
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						resolve({ data: mDescribe });
					}, 1);
				});
			} else {
				//console.log('Have no describe in cache, fetch from api');
				try {
					const query = new URLSearchParams({
						token: userData?.Token
					});
					const url = `/${ConvertApiName(targetModuleName)}/describe?${query.toString()}`;
					//console.log('[ModulePageRoot]  GetModuleDescribe url', url);
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

		if (!IsEmptyOrNullOrUndefined(currentModule)) {
			setIsLoading(true);

			Promise.all([
				GetModuleDetail(ExtId),
				GetModuleActionList('Detail', ExtId),
				GetModuleDescribe(currentModule)
			])
				.then(
					(values) => {
						//Module Detail
						const mDetail =
							typeof values[0]?.data === 'string' ? JSON.parse(values[0]?.data) : values[0]?.data;

						setModuleDetail(mDetail?.data);
						ModuleInfo.SetFullDetailData(mDetail);

						//Module Action
						const actionList = values[1].data;
						const newActions = actionList.map((action) => {
							if (action.Name === 'Edit') {
								return CreateBSOptions(
									action,
									'square-edit-outline',
									'ModulePageEdit',
									OnlyNavigateScreen,
									false,
									{}
								);
							} else if (action.Name === 'Delete') {
								const dialogMsg = {
									title: 'Remove',
									body: 'Do you want to remove this record?',
									yes: 'Yes',
									no: 'Cancel'
								};
								return CreateBSOptions(
									action,
									'delete',
									null,
									DeleteRecordHandler,
									true,
									dialogMsg
								);
							} else if (action.Name === 'Clone') {
								return CreateBSOptions(
									action,
									'content-copy',
									'ModulePageClone',
									CloneHandler,
									false,
									{}
								);
							} else if (action.Name === 'Log') {
								return CreateBSOptions(
									action,
									'history',
									'ModuleChangelog',
									OnlyNavigateScreen,
									false,
									{}
								);
							} else if (action.Name === 'Sharing') {
								return CreateBSOptions(
									action,
									'share-variant',
									'ModuleSharing',
									OnlyNavigateScreen,
									false,
									{}
								);
							} else {
								return CreateBSOptions(
									action,
									'arrow-right-bold',
									'ModulePageSharing',
									OnlyNavigateScreen,
									false,
									{}
								);
							}
						});
						setActions(newActions);

						//Describe
						if (values[2]) {
							CacheManager.AddDescribeCache(values[2]?.data);
							setDescribe(values[2]?.data);
						}

						setIsLoading(false);

						//GetModuleRolePageLayoutDetail
						let layoutList = ModuleInfo.GetModuleInfoState().pageLayoutList;
						if (!layoutList || layoutList.length <= 0) {
							//Fetch new one
							console.log('layoutList', layoutList, layoutList.length);
							GetModuleRolePageLayoutList(currentModule).then((response) => {
								layoutList = response?.data;
								if (layoutList && layoutList.length > 0) {
									ModuleInfo.SetPageLayoutList(layoutList);
								}

								let detailLayout = FindCurrentLayout(layoutList, currentPageType);

								if (detailLayout && 'id' in detailLayout) {
									GetModuleRolePageLayoutDetail(detailLayout.id);
								}
							});
						} else {
							let detailLayout = FindCurrentLayout(layoutList, currentPageType);

							if (detailLayout && 'id' in detailLayout) {
								GetModuleRolePageLayoutDetail(detailLayout.id);
							}
						}
					},
					(reject) => {
						console.log(reject);
					}
				)
				.catch((errors) => {
					console.info('[ModulePageRoot] Promise all error', errors);
				});
		}
	}, [currentModule, navigation]);

	React.useEffect(() => {
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
							setProcedureDetail(resp?.data);
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

		GetProcedureDetail(ExtId);
	}, [currentModule, navigation]);

	function CreateBSOptions(
		action,
		iconName,
		nextPage,
		actionBefore,
		needDialog = false,
		dialogMessages = { title: '', body: '', yes: '', no: '' }
	) {
		return {
			title: action.Name,
			icon: iconName,
			Location: action.Location,
			nextPage: nextPage,
			ActionBeforeNext: actionBefore,
			needDialog: needDialog,
			dialogMessages: dialogMessages
		};
	}

	/*Even handler */

	const DeleteRecordHandler = async (props) => {
		//setDialogVisible(true);
		setIsLoading(true);

		//Delete record item
		const query = new URLSearchParams({
			token: userData?.Token,
			id: ExtId
		});

		const url = `/${ConvertApiName(
			ModuleInfo.GetModuleInfoState().moduleName
		)}?${query.toString()}`;
		await RestClientInstance()
			.delete(url)
			.then(
				(resp) => {
					showMessage({
						message: `Item id: ${ExtId} has been successfully delete.`,
						type: 'success'
					});
					navigation.pop();
				},
				(reject) => {
					showMessage({
						message: `Delete Item id: ${ExtId} failed.`,
						type: 'danger'
					});
				}
			)
			.catch((errResp) => {
				console.info('[ModuleDetail] Delete  Error', errResp);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const CloneHandler = async (props) => {
		navigation.navigate('ModulePageCreate', { create_type: 'clone' });
	};

	const OnlyNavigateScreen = (props) => {
		if (!IsEmptyOrNullOrUndefined(props?.nextPage)) {
			navigation.navigate(props?.nextPage);
		}
	};

	function FieldCreator({ Name, Value, IndexKey, FieldInfo }) {
		if (FieldInfo) {
			if (
				[
					'Lookup',
					'Text',
					'TextArea',
					//'Picklist',
					'Text Editor',
					'AutoNumber',
					'TinyNumber',
					'Decimal',
					'Email'
				].includes(FieldInfo.Type)
			) {
				if (
					(!IsEmptyOrNullOrUndefined(Value) && FieldInfo['Show QR Code'] === 'true') ||
					FieldInfo['Show QR Code'] === true
				) {
					return <ViewQRCode FieldName={Name} TextValue={Value} key={IndexKey} />;
				} else {
					return <ViewText FieldName={Name} TextValue={Value} key={IndexKey} />;
				}
			} else if (FieldInfo.Type === 'Picklist') {
				return (
					<ViewTextBadge FieldName={Name} FieldInfo={FieldInfo} TextValue={Value} key={IndexKey} />
				);
			} else {
				if (FieldInfo.Type === 'File') {
					return <ViewFile FieldName={Name} FileData={Value} key={IndexKey} />;
				} else if (FieldInfo.Type === 'Image') {
					return <ViewImage FieldName={Name} ImageData={Value} key={IndexKey} />;
				} else if (FieldInfo.Type === 'Date') {
					return <ViewText FieldName={Name} TextValue={Value} key={IndexKey} />;
				} else if (FieldInfo.Type === 'DateTime') {
					return <ViewText FieldName={Name} TextValue={Value} key={IndexKey} />;
				}
			}
		} else {
			//Maybe system field
			return <ViewText FieldName={Name} TextValue={Value} key={IndexKey} />;
		}
	}

	React.useEffect(() => {
		if (
			pageLayoutDetail &&
			'ModuleName' in pageLayoutDetail &&
			ConvertApiName(pageLayoutDetail?.ModuleName) ===
				ConvertApiName(ModuleInfo.GetModuleInfoState().moduleName)
		) {
			if (pageLayoutDetail?.Layout && moduleDetail) {
				let SectionContainerList = [];

				//Section Content
				pageLayoutDetail.Layout.map((layout, sectionIndex) => {
					switch (layout.SectionType) {
						case 'relation':
							break;
						case 'fieldset':
							let contentFieldList = [];
							let allFieldsData = {};
							const contents = moduleDetail.map((dataObj, index) => dataObj.content);
							contents.flatMap((data, index) => Object.assign(allFieldsData, data));

							//console.log('//Section Content - describe', describe);
							layout?.Fields.map((fieldName, index) => {
								const childKey = `${sectionIndex}_${index}`;
								const fieldInfo = describe.Fields.find((field) => fieldName === field.Name);

								contentFieldList.push(
									FieldCreator({
										Name: fieldName,
										Value: allFieldsData[fieldName],
										IndexKey: childKey,
										FieldInfo: fieldInfo
									})
								);
							});

							//Create Section Concainer
							const SectionContainer = (
								<View style={SectionStyle.container} key={sectionIndex}>
									<View style={SectionStyle.header}>
										<Text style={SectionStyle.headerText}>{layout.SectionName}</Text>
									</View>
									{contentFieldList.map((field) => field)}
								</View>
							);

							SectionContainerList.push(SectionContainer);
					}
				});

				//Section
				setSectionComponent(SectionContainerList);
			}
		}
	}, [pageLayoutDetail, moduleDetail]);

	useFocusEffect(
		React.useCallback(() => {
			if (!isObjectEmpty(ModuleInfo.GetModuleInfoState()?.actionResult)) {
				let badge;
				let actionStatus = ModuleInfo.GetModuleInfoState()?.actionResult?.status;
				//console.log('actionStatus', actionStatus);
				if (actionStatus === SUCCESS_FLAG) {
					badge = (
						<DoneMessageBox
							message={ModuleInfo.GetModuleInfoState()?.actionResult?.message}
							SetStatusBadge={SetStatusBadge}
						/>
					);
				} else if (actionStatus === ERROR_FLAG) {
					badge = (
						<ErrorMessageBox
							message={ModuleInfo.GetModuleInfoState()?.actionResult?.message}
							SetStatusBadge={SetStatusBadge}
						/>
					);
				}
				SetStatusBadge(badge);
			}
		}, [ModuleInfo.GetModuleInfoState().actionResult])
	);

	/*Bottom Sheet Varaiable */
	// ref
	const refRBSheet = React.useRef();

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		try {
			const query = new URLSearchParams({
				token: userData?.Token,
				id: ExtId
			});
			let url = `/${ConvertApiName(
				ModuleInfo.GetModuleInfoState().moduleName
			)}?${query.toString()}`;
			//console.log(url);
			await RestClientInstance()
				.get(url)
				.then((response) => {
					const fullModuleDetail = response?.data;
					setModuleDetail(fullModuleDetail?.data);
					ModuleInfo.SetFullDetailData(fullModuleDetail);
				});
		} catch (e) {
			console.log(e);
		}

		setRefreshing(false);
	}, []);

	const EditProcedureField = React.useCallback(
		({ props }) => {
			if (procedureDetail === null || isObjectEmpty(procedureDetail)) {
				return [];
			} else {
				return (
					<FormProvider {...formMethods}>
						<EditProcedureFieldComponent {...{ ExtId, procedureDetail }} />
					</FormProvider>
				);
			}
		},
		[procedureDetail]
	);

	//Render
	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<View style={MainStyles.container}>
						{statusBadge}
						{SectionComponent}
						{GetValueFromObject(describe, 'Enable Procedure', 'EnableProcedure') === true ? (
							<EditProcedureField />
						) : (
							[]
						)}
					</View>
				</ScrollView>
				<FloatingButton
					icon="microsoft-xbox-controller-menu"
					size={60}
					color={ThemeColor.PRIMARY}
					onPress={() => refRBSheet.current.open()}
				/>

				<BottomSheetListComponent
					RefRBSheet={refRBSheet}
					Navigation={navigation}
					Title="Module Actions"
					ActionList={actions}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ModulePageRoot;
