import * as React from 'react';
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	ActivityIndicator,
	StatusBar,
	useWindowDimensions,
	Pressable,
	Modal,
	RefreshControl
} from 'react-native';
import { Button, ListItem, Avatar, Image, Overlay, AvatarIcon, Card } from 'react-native-elements';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import {
	BuildImageSource,
	ConvertApiName,
	IsEmptyOrNullOrUndefined
} from '../../../../helper/StringUtils';

import GlobalStyle from './../../../../styles/GlobalStyle';
import LoadingStyle from '../../../../styles/component/LoadingStyle';

import { RestClient } from '../../../../helper/RestClient';
import NotFoundComponent from '../../../../component/NotFoundComponent';
import ThemeColor from '../../../../constants/ThemeColor';
import { DataTable } from 'react-native-paper';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { RadioButton } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { GetContrast } from '../../../../helper/ColorUtils';
import { FloatingButton } from '../../../../component/MyFloatingButton';
import { BottomSheetListComponent } from '../../../../component/BottomSheetComponent';

const ListView = (props) => {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);

	const isFocused = useIsFocused();

	const [moduleViewList, setModuleViewList] = React.useState([]);
	const [rawListData, SetRawListData] = React.useState({});

	const [recordViewList, SetRecordViewList] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(true);
	const [modalVisible, setModalVisible] = React.useState(false);

	const [checkedView, setCheckedView] = React.useState(0);
	const [refreshing, setRefreshing] = React.useState(false);
	const [currentReportViewId, setCurrentReportViewId] = React.useState('');

	const screenDimension = useWindowDimensions();

	//pagination
	const itemsPerPage = 10;
	const [page, setPage] = React.useState(0);
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	React.useEffect(() => {
		return () => {
			console.log('[ListView] Cleanup');
			//SetRecordViewList([]);
		};
	}, []);

	React.useEffect(() => {
		let moduleName = ModuleInfo.GetModuleInfoState().moduleName;

		async function GetModuleViewList() {
			setIsLoading(true);
			try {
				const query = new URLSearchParams({
					token: userData?.Token
				});
				let url = `/${ConvertApiName(moduleName)}/view?${query.toString()}`;
				await RestClientInstance()
					.get(url)
					.then((response) => {
						Prepare(response.data);
					})
					.catch((error) => {
						console.log('[ListView-GetModuleViewList] ' + url + ' error', error);
					})
					.finally(() => {});
			} catch (e) {
				console.log(e);
			}
		}

		async function Prepare(viewList) {
			if (Array.isArray(viewList) && viewList.length !== 0) {
				const filteredViews = Array.from(viewList).filter(
					(view) => view['Report Type'] === 'List View'
				);
				setModuleViewList(filteredViews);
				if (filteredViews && filteredViews?.length !== 0) {
					let viewId = '';
					if (filteredViews?.length <= checkedView + 1) {
						viewId = filteredViews[0].id;
					} else {
						viewId = filteredViews[checkedView].id;
					}
					setCurrentReportViewId(viewId);
					await GetListOfReportRecord(viewId);
				} else {
					//Not found List view
					SetRecordViewList([]);
					setIsLoading(false);
					setRefreshing(false);
				}
			} else {
				SetRecordViewList([]);
				setIsLoading(false);
				setRefreshing(false);
			}
		}

		async function GetListOfReportRecord(reportViewId) {
			if (!IsEmptyOrNullOrUndefined(reportViewId)) {
				try {
					const query = new URLSearchParams({
						token: userData?.Token,
						id: reportViewId,
						page: page + 1
					});
					let url = `/${ConvertApiName(moduleName)}/data?${query.toString()}`;
					//console.log('ListViewScreen GetListOfReportRecord : url=', url);
					await RestClientInstance()
						.get(url)
						.then((response) => {
							//console.log(response?.data);
							PrepareRecordViewListData(response?.data);
						})
						.catch((error) => {
							console.log('[ListView-GetListOfReportRecord] ' + url + ' error', error);
						})
						.finally(() => {
							setIsLoading(false);
							setRefreshing(false);
						});
				} catch (e) {
					console.log(e);
				}
			}
		}

		if (page < 0) {
			setPage(0);
		} else {
			GetModuleViewList();
		}
	}, [ModuleInfo.GetModuleInfoState().moduleName, page]);

	function PrepareRecordViewListData(rawListData) {
		//console.log(rawListData);
		if (rawListData !== null && rawListData !== undefined) {
			const Template = rawListData?.Template;
			const Records = rawListData?.Records;
			if (Template && Records && Records?.length > 0) {
				const recordList = Records.map((record) => {
					let listViewRecord = Object.fromEntries(
						Object.entries(Template).map(([templateKey, field]) => {
							return [templateKey, field in record ? record[field] : ''];
						})
					);
					listViewRecord.id = record?.id;
					return listViewRecord;
				});
				SetRawListData(rawListData);
				//console.log('rawListData', rawListData);
				SetRecordViewList({ Template: Template, recordList: recordList });

				setIsLoading(false);
				setRefreshing(false);
			} else {
				setIsLoading(false);
				setRefreshing(false);
			}
		} else {
			setIsLoading(false);
			setRefreshing(false);
		}
	}

	const MyViewBtn = () => {
		return (
			<Button
				type="outline"
				title="My Views"
				icon={() => <Icon name="auto-fix" size={20} />}
				//loading={iconLoading}
				loadingProps={{ animating: true }}
				//titleStyle={btnStyle.title}
				buttonStyle={{ borderWidth: 1 }}
				containerStyle={{ flex: 2, paddingVertical: 5, marginHorizontal: 10 }}
				onPress={() => setModalVisible(true)}
			/>
		);
	};

	const ViewOptions = (optionsProp) => {
		const { list } = optionsProp;
		return list?.length > 0 ? (
			list?.map((view, index) => {
				return (
					<ListItem key={index}>
						<ListItem.Content>
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								<RadioButton
									value={checkedView}
									status={checkedView === index ? 'checked' : 'unchecked'}
									onPress={() => {
										setCheckedView(index);
										setModalVisible(false);
									}}
								/>
								<ListItem.Title style={{ textAlignVertical: 'center' }}>
									{view?.Name}
								</ListItem.Title>
							</View>
						</ListItem.Content>
					</ListItem>
				);
			})
		) : (
			<View />
		);
	};

	function goToDetailScreen(extId) {
		props.navigation.navigate('ModulePageRoot', {
			ExtId: extId,
			selectedModuleName: ModuleInfo.GetModuleInfoState().moduleName
		});
	}

	const onRefresh = React.useCallback(() => {
		async function GetListOfReportRecord() {
			try {
				const moduleName = ModuleInfo.GetModuleInfoState().moduleName;

				const query = new URLSearchParams({
					token: userData?.Token,
					id: currentReportViewId,
					page: 1
				});
				let url = `/${ConvertApiName(moduleName)}/data?${query.toString()}`;
				//console.log('GetListOfReportRecord - url:', url);
				return await RestClientInstance().get(url);
			} catch (e) {
				console.log(e);
			}
		}

		setRefreshing(true);
		/* if (!IsEmptyOrNullOrUndefined(currentReportViewId)) {
			GetListOfReportRecord()
				.then(
					(response) => {
						PrepareRecordViewListData(response?.data);
					},
					(reject) => {
						showMessage({ message: reject, type: 'danger' });
					}
				)
				.finally(() => {
					setIsLoading(false);
					setRefreshing(false);
				});
		} else {
			setIsLoading(false);
			setRefreshing(false);
		} */

		setPage(-1);
	}, [currentReportViewId]);

	/*Floating button */
	const refRBSheet = React.useRef();
	const actionList = [
		{
			title: 'Create',
			icon: 'plus-circle',
			Location: 'Create',
			nextPage: 'ModulePageCreate',
			ActionBeforeNext: () => {
				props?.navigation.navigate('ModulePageCreate');
			},
			needDialog: false,
			dialogMessages: {}
		}
	];

	const RenderListItem = React.useCallback(
		({ Template, recordList }) => {
			if (Template && recordList) {
				if (recordList?.length <= 0) {
					return <NotFoundComponent missingThing="Data" {...{ screenInfo: screenDimension }} />;
				}
				const moduleDescribe = ModuleInfo.GetModuleInfoState().describe;
				const desc1Info = moduleDescribe?.Fields?.find(
					(field) => field?.Name === GetValueFromObject(Template, 'Description 1', 'Description1')
				);
				const desc2Info = moduleDescribe?.Fields?.find(
					(field) => field?.Name === GetValueFromObject(Template, 'Description 2', 'Description2')
				);
				const desc3Info = moduleDescribe?.Fields?.find(
					(field) => field?.Name === GetValueFromObject(Template, 'Description 3', 'Description3')
				);
				const desc4Info = moduleDescribe?.Fields?.find(
					(field) => field?.Name === GetValueFromObject(Template, 'Description 4', 'Description4')
				);
				const imgInfo = moduleDescribe?.Fields?.find((field) => field?.Name === Template?.Image);
				const imgIconInfo = moduleDescribe?.Fields?.find(
					(field) => field?.Name === GetValueFromObject(Template, 'Image Icon', 'Image Icon')
				);
				const listInfo = moduleDescribe?.Fields?.find((field) => field?.Name === Template.List);

				return recordList?.length > 0 ? (
					recordList.map((record, keyIndex) => {
						let listComponent = <Text style={listStyles.roundText}>{record.List}</Text>;
						if (listInfo?.Type === 'Picklist') {
							const listValue = GetValueFromObject(listInfo, 'List Value', 'ListValue');

							const listValueItem = listValue?.find((value) => value.Name === record?.List);
							if (listValueItem) {
								if (listValueItem['Display As'] === 'Color') {
									listComponent = (
										<Text
											style={[
												listStyles.roundText,
												{
													backgroundColor: listValueItem.Value.Color,
													color: GetContrast(listValueItem.Value.Color)
												}
											]}>
											{record.List}
										</Text>
									);
								}
							}
						}
						return (
							<Pressable
								onPress={() => goToDetailScreen(record?.id)}
								key={keyIndex}
								style={({ pressed }) => ({
									backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
								})}>
								<ListItem key={keyIndex} containerStyle={listStyles.container} bottomDivider={true}>
									<Image
										source={
											record.Image !== ''
												? BuildImageSource(
														IsEmptyOrNullOrUndefined(record?.Image) ? '' : record.Image
												  )
												: require('../../../../resources/img/round_image.png')
										}
										style={listStyles.mainImage}
										PlaceholderContent={<ActivityIndicator />}
										containerStyle={listStyles.containerImage}
									/>
									<ListItem.Content style={listStyles.content}>
										<View style={listStyles.topTitleContainer}>
											<ListItem.Title style={listStyles.topTitle} h5>
												{record['Description 1']}
											</ListItem.Title>
											<Image
												source={
													record['Image Icon'] !== ''
														? BuildImageSource(
																IsEmptyOrNullOrUndefined(record['Image Icon'])
																	? ''
																	: record['Image Icon']
														  )
														: require('../../../../resources/img/round_image.png')
												}
												style={listStyles.iconImage}
												containerStyle={listStyles.containerImage}
											/>
										</View>
										<View style={listStyles.middleTitleContainer}>
											<Text style={{ color: '#677888' }}>{record['Description 2']}</Text>
											<Text style={{ color: '#1887fc' }}>{record['Description 3']}</Text>
										</View>
										<View style={listStyles.bottomTitleContainer}>
											<Text style={listStyles.bottomTitle}>{record['Description 4']}</Text>
											{!IsEmptyOrNullOrUndefined(record.List) && listComponent}
										</View>
									</ListItem.Content>
								</ListItem>
							</Pressable>
						);
					})
				) : (
					<NotFoundComponent missingThing="Data" {...{ screenInfo: screenDimension }} />
				);
			} else {
				return <NotFoundComponent missingThing="Data" {...{ screenInfo: screenDimension }} />;
			}
		},
		[recordViewList]
	);
	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<Card containerStyle={{ flex: 1 }} wrapperStyle={{}}>
					<Card.Title h3 h3Style={{ color: ThemeColor.TEXT }}>
						Choose a view
					</Card.Title>
					<Pressable
						onPress={() => setModalVisible(!modalVisible)}
						style={{ position: 'absolute', right: 0, top: 0 }}>
						<Icon name="close" size={30} color={ThemeColor.BaseComponent} />
					</Pressable>
					<Card.Divider />
					<ScrollView>
						<ViewOptions list={moduleViewList} />
					</ScrollView>
				</Card>
			</Modal>
			<DataTable style={{ flex: 1 }}>
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					style={{ flex: 1 }}
					contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<View style={GlobalStyle.container}>
						<View style={{ flexDirection: 'row' }}>
							<MyViewBtn />
						</View>
						<RenderListItem {...recordViewList} />
					</View>
				</ScrollView>
				<DataTable.Pagination
					page={page}
					numberOfPages={Math.ceil(
						GetValueFromObject(rawListData, 'Total Records', 'TotalRecords') / itemsPerPage
					)}
					onPageChange={(selectedPage) => setPage(selectedPage)}
					label={`${from + 1}-${to} of ${
						IsEmptyOrNullOrUndefined(
							GetValueFromObject(rawListData, 'Total Records', 'TotalRecords')
						)
							? 0
							: GetValueFromObject(rawListData, 'Total Records', 'TotalRecords')
					}`}
				/>
			</DataTable>
			<FloatingButton
				icon="plus-circle"
				size={60}
				color={ThemeColor.PRIMARY}
				onPress={() => {
					refRBSheet.current.open();
				}}
			/>

			<BottomSheetListComponent
				RefRBSheet={refRBSheet}
				Navigation={props?.navigation}
				Title="Module Actions"
				ActionList={actionList}
			/>
		</View>
	);
};

const listStyles = StyleSheet.create({
	container: {
		flex: 10
	},
	content: {
		flex: 7,
		flexDirection: 'column'
	},
	topTitleContainer: {
		flexDirection: 'row'
	},
	middleTitleContainer: {},
	bottomTitleContainer: {
		marginTop: 5,
		flexDirection: 'row'
	},
	topTitle: {
		flex: 6,
		fontWeight: 'bold',
		flexWrap: 'wrap'
	},
	middleTitle: {},
	bottomTitle: {
		textAlignVertical: 'center',
		flex: 4,
		color: '#677888',
		flexWrap: 'wrap'
	},
	roundText: {
		fontWeight: 'bold',
		color: '#000',
		alignItems: 'center',
		textAlignVertical: 'center',
		//borderColor: '#000',
		//borderWidth: 1,
		borderRadius: 13,
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	mainImage: {
		height: 60,
		width: 60
	},
	iconImage: {
		height: 25,
		width: 25
	},
	containerImage: { borderColor: '#ccc', borderWidth: 1 }
});

export default ListView;
