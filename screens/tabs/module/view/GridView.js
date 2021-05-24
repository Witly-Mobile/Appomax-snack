/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	RefreshControl,
	SafeAreaView,
	View,
	Modal,
	ScrollView,
	Pressable,
	StyleSheet,
	ActivityIndicator,
	Text,
	useWindowDimensions,
	TouchableOpacity
} from 'react-native';
import LoadingStyle from '../../../../styles/component/LoadingStyle';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { Button, Card, ListItem } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';

import { ConvertApiName, IsEmptyOrNullOrUndefined } from '../../../../helper/StringUtils';
import NotFoundComponent from '../../../../component/NotFoundComponent';
import ThemeColor from '../../../../constants/ThemeColor';
import { DataTable } from 'react-native-paper';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { showMessage } from 'react-native-flash-message';
import { RadioButton } from 'react-native-paper';
import { FloatingButton } from '../../../../component/MyFloatingButton';
import { BottomSheetListComponent } from '../../../../component/BottomSheetComponent';
import { GetContrast } from '../../../../helper/ColorUtils';
import { TextBadge } from '../../../../component/ViewText';

const GridView = (props) => {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const isFocused = useIsFocused();

	const [isLoading, setIsLoading] = React.useState(true);
	const [refreshing, setRefreshing] = React.useState(false);
	const [currentModule, setCurrentModule] = React.useState(
		ModuleInfo.GetModuleInfoState().moduleName
	);
	const [moduleViewList, setModuleViewList] = React.useState([]);
	const [recordViewList, setRecordViewList] = React.useState(null);
	const [modalVisible, setModalVisible] = React.useState(false);

	const [checkedView, setCheckedView] = React.useState(0);
	const [currentReportViewId, setCurrentReportViewId] = React.useState('');

	const screenDimension = useWindowDimensions();

	//pagination
	const itemsPerPage = 50;
	const [page, setPage] = React.useState(0);
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	React.useEffect(() => {
		let moduleName = ModuleInfo.GetModuleInfoState().moduleName;

		async function GetModuleViewList() {
			setIsLoading(true);
			try {
				const query = new URLSearchParams({
					token: userData?.Token
				});
				let url = `/${ConvertApiName(moduleName)}/view?${query.toString()}`;
				//console.log('GetModuleViewList url', url);
				await RestClientInstance()
					.get(url)
					.then((response) => {
						//console.log('[GridView-GetModuleViewList] ' + url + ' success', response.data);
						Prepare(response.data);
					})
					.catch((error) => {
						console.log('[GridView-GetModuleViewList] ' + url + ' error', error);
						setIsLoading(false);
						setRefreshing(false);
					})
					.finally(() => {});
			} catch (e) {
				console.log(e);
			}
		}

		async function Prepare(viewList) {
			if (Array.isArray(viewList) && viewList.length !== 0) {
				const filteredViews = Array.from(viewList).filter(
					(view) => view['Report Type'] === 'Grid View' || view['Report Type'] === 'Personal View'
				);
				setModuleViewList(filteredViews);
				if (filteredViews && filteredViews?.length !== 0) {
					let viewId = '';
					if (filteredViews?.length <= checkedView + 1) {
						viewId = filteredViews[0].id;
					} else {
						viewId = filteredViews[checkedView].id;
					}
					//console.log('filteredViews id', viewId);
					setCurrentReportViewId(viewId);
					await GetListOfReportRecord(viewId);
				} else {
					setRecordViewList([]);
					setIsLoading(false);
					setRefreshing(false);
				}
			} else {
				setRecordViewList([]);
				setIsLoading(false);
				setRefreshing(false);
			}
		}

		async function GetListOfReportRecord(reportViewId) {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: reportViewId,
					page: page + 1
				});
				let url = `/${ConvertApiName(moduleName)}/data?${query.toString()}`;
				await RestClientInstance()
					.get(url)
					.then((response) => {
						//console.log('GetListOfReportRecord from', moduleName, ' = ', response.data);
						setRecordViewList(response.data);
					})
					.catch((error) => {
						console.log('[GridView-GetListOfReportRecord] ' + url + ' error', error);
					})
					.finally(() => {
						setIsLoading(false);
						setRefreshing(false);
					});
			} catch (e) {
				console.log(e);
			}
		}

		if (page < 0) {
			setPage(0);
		} else {
			console.log('loading Page', page);
			setIsLoading(true);
			setRefreshing(true);
			GetModuleViewList();
		}

		return () => {
			console.log('[GridView] Cleanup');
			//setRecordViewList();
			//setCheckedView(0);
		};
	}, [ModuleInfo.GetModuleInfoState().moduleName, page, checkedView]);

	const GridDataTable = React.useCallback(
		(gridProps) => {
			if (Object.keys(gridProps).length === 0) {
				return <NotFoundComponent missingThing="Data" {...{ screenInfo: screenDimension }} />;
			} else {
				return GridDataTableComponent(gridProps);
			}
		},
		[recordViewList]
	);

	/*Function */
	function GotoMyViewManager() {
		props.navigation.navigate('MyView');
	}

	function goToDetailScreen(extId) {
		props.navigation.navigate('ModulePageRoot', {
			ExtId: extId,
			selectedModuleName: ModuleInfo.GetModuleInfoState().moduleName
		});
	}

	function GridDataTableComponent(itemList) {
		const describeFields = ModuleInfo.GetModuleInfoState().describe?.Fields;
		const tableWidth = screenDimension?.width * 0.915;
		return (
			<ScrollView horizontal={true}>
				<View>
					<Table style={{ borderColor: '#a5a5a5', borderLeftWidth: 1 }}>
						<Row
							data={itemList?.Header}
							widthArr={setColumnWidth(tableWidth, itemList?.Header)}
							style={[styles.header, { minWidth: tableWidth }]}
							textStyle={styles.text}
						/>
						<ScrollView
							showsHorizontalScrollIndicator={true}
							style={[styles.dataWrapper, { minWidth: screenDimension?.width * 0.915 }]}>
							{itemList?.Records.flatMap((record) => record).map((record, index) => {
								let extId = '';
								let noIdRecord = Object.assign({}, record);
								if ('id' in noIdRecord) {
									extId = noIdRecord.id;
									delete noIdRecord.id;
								}

								let rowData = Object.values(noIdRecord);

								let cellWidth = 100;
								const allCellWidth = 100 * rowData?.length;
								if (tableWidth >= allCellWidth) {
									cellWidth = tableWidth / rowData?.length;
								}

								const rowComponent = (
									<TableWrapper
										key={index}
										style={[styles.row, { minWidth: screenDimension?.width * 0.915 }]}>
										{Object.entries(noIdRecord)?.map(([name, value], cellIndex) => {
											const cellComponent = (keyName, textValue) => {
												const fieldInfo = describeFields?.find((field) => field.Name === keyName);
												return TextBadge(fieldInfo, textValue);
											};
											return (
												<Cell
													style={{ minWidth: cellWidth }}
													key={cellIndex}
													data={cellComponent(name, value)}
													textStyle={[styles.text, { color: 'red' }]}
												/>
											);
										})}
									</TableWrapper>
								);

								return (
									<Pressable
										onPress={() => goToDetailScreen(extId)}
										key={index}
										style={({ pressed }) => ({
											backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
										})}>
										{rowComponent}
									</Pressable>
								);
							})}
						</ScrollView>
					</Table>
				</View>
			</ScrollView>
		);
	}

	function setColumnWidth(tableWidth, rowData) {
		let cellWidth = 100;
		const allCellWidth = 100 * rowData?.length;
		if (tableWidth >= allCellWidth) {
			cellWidth = tableWidth / rowData?.length;
		}

		let widthArr = [];
		if (rowData && rowData.length) {
			rowData.forEach(() => {
				widthArr.push(cellWidth);
			});
		}
		return widthArr;
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

	//Action bottom sheet

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
						setRecordViewList(response.data);
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

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					showMessage({ message: 'Modal has been closed.', type: 'info' });
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
					<View style={styles.container}>
						<View style={{ flexDirection: 'row' }}>
							<MyViewBtn />
						</View>
						<GridDataTable {...recordViewList} />
					</View>
				</ScrollView>
				<DataTable.Pagination
					page={page}
					numberOfPages={Math.ceil(
						GetValueFromObject(recordViewList, 'Total Records', 'TotalRecords') / itemsPerPage
					)}
					onPageChange={(selectedPage) => setPage(selectedPage)}
					label={`${from + 1}-${to} of ${
						IsEmptyOrNullOrUndefined(
							GetValueFromObject(recordViewList, 'Total Records', 'TotalRecords')
						)
							? 0
							: GetValueFromObject(recordViewList, 'Total Records', 'TotalRecords')
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
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		padding: 16,
		backgroundColor: '#fff',
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1
	},
	header: {
		height: 50,
		backgroundColor: '#f5f5f5',
		justifyContent: 'flex-start',
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1
	},
	text: { textAlign: 'left', fontWeight: '100', marginLeft: 8 },
	dataWrapper: { marginTop: -1 },
	row: {
		flexDirection: 'row',
		height: 70,
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 0.8,
		alignItems: 'center'
	},
	bodyBadge: (bkColor) => ({
		backgroundColor: bkColor,
		alignItems: 'center',
		borderRadius: 20
	}),
	textBadge: (bkColor) => ({ color: GetContrast(bkColor), marginVertical: 5 })
});

function TitleBarButton({ navigation, data, event }) {
	return (
		<View style={titleBarButton.titleIcon}>
			<TouchableOpacity onPress={event}>
				<Icon name={data} size={24} color={ThemeColor.INVERT_PRIMARY} />
			</TouchableOpacity>
		</View>
	);
}

const titleBarButton = StyleSheet.create({
	titleIcon: {
		margin: 16,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
export default GridView;
