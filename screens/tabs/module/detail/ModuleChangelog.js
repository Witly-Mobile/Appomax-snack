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
	RefreshControl
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { Table, Row } from 'react-native-table-component';
//import { GridDataTableComponent } from '../../../../component/GridTableComponent';
import NotFoundComponent from '../../../../component/NotFoundComponent';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { ConvertApiName, IsEmptyOrNullOrUndefined } from '../../../../helper/StringUtils';
import LoadingStyle from '../../../../styles/component/LoadingStyle';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import ThemeColor from '../../../../constants/ThemeColor';
import { SafeAreaView } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';

const changelogData = {
	Page: 1,
	'Total Records': 24,
	Header: [
		'Change Type',
		'Changed Date',
		'Changed By',
		'Module',
		'Record',
		'Relation',
		'Related Record',
		'Change Detail'
	],
	Records: [
		{
			'Change Type': 'Update',
			'Changed Date': '28/04/2021 12:24:31 PM',
			'Changed By': 'Admin easset',
			Module: 'Category',
			Record: '01',
			Relation: '',
			'Related Record': '',
			'Change Detail': [
				{
					Field: 'Category Name',
					'Old Value': 'Standard Operating Procedure',
					'New Value': 'Standard Oper'
				}
			]
		}
	]
};

const ModuleChangelog = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = React.useState(true);
	const [recordViewList, setRecordViewList] = React.useState(null);
	const [refreshing, setRefreshing] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [fieldChangeDetail, setFieldChangeDetail] = React.useState();
	const screenDimension = useWindowDimensions();

	//pagination
	const itemsPerPage = 20;
	const [page, setPage] = React.useState(0);
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	const ModuleInfo = React.useContext(ModuleContext);

	React.useEffect(() => {
		const selectedModuleName = ModuleInfo.GetModuleInfoState().moduleName;
		const ExtId = ModuleInfo.GetModuleInfoState().detailData?.id;
		navigation.setOptions({
			title: selectedModuleName
				? `${selectedModuleName} - Changelog`
				: `${ModuleInfo.GetModuleInfoState().moduleName} - Changelog`
		});

		async function FetchChangelogData() {
			try {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: ExtId,
					page: page + 1,
					size: itemsPerPage
				});
				let url = `/${ConvertApiName(
					ModuleInfo.GetModuleInfoState().moduleName
				)}/changelog?${query.toString()}`;
				await RestClientInstance()
					.get(url)
					.then(
						(resp) => {
							PrepareDataList(resp?.data);
						},
						(reject) => {
							console.log('FetchChangelogData Reject', reject);
						}
					)
					.catch((errResp) => {
						console.log('FetchChangelogData catch', errResp);
					})
					.finally(() => {
						setIsLoading(false);
					});
			} catch (exception) {
				console.log('FetchChangelogData exception', exception);
				setIsLoading(false);
			}
		}

		FetchChangelogData();
	}, []);

	function PrepareDataList(rawChangelogData) {
		setRecordViewList(rawChangelogData);
	}

	const changelogDetail = (params) => {
		if (params?.length) {
		}
		const dataList = {
			Header: ['Field', 'New Value', 'Old Value'],
			Records: params?.length ? params : []
		};

		/* 		const fieldChangeDetailComponent = (
			<View style={{ flex: 1, backgroundColor: 'red' }}>
				<Text>111111111111111111111</Text>
				<ScrollView
					style={{ width: '100%' }}
					contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<Text>2222222222222222222222</Text>
				</ScrollView>
			</View>
		); */

		setFieldChangeDetail(dataList);
		setModalVisible(true);
	};

	const onRefresh = React.useCallback(() => {}, []);

	//Render
	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : recordViewList?.Records?.length > 0 ? (
		<SafeAreaView style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<Card containerStyle={{ flex: 1 }} wrapperStyle={{}}>
					<Card.Title h3 h3Style={{ color: ThemeColor.TEXT }}>
						Field Change Set
					</Card.Title>
					<Pressable
						onPress={() => setModalVisible(!modalVisible)}
						style={{ position: 'absolute', right: 0, top: 0 }}>
						<Icon name="close" size={30} color={ThemeColor.BaseComponent} />
					</Pressable>
					<Card.Divider />
					<ScrollView>
						<GridDataTableComponent
							itemList={fieldChangeDetail}
							screenDimension={screenDimension}
							OnItemPress={() => {}}
						/>
					</ScrollView>
				</Card>
			</Modal>
			<DataTable style={{ flex: 1 }}>
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					style={{ flex: 1 }}
					contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
					<View style={styles.container}>
						<GridDataTableComponent
							itemList={recordViewList}
							screenDimension={screenDimension}
							OnItemPress={changelogDetail}
						/>
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
		</SafeAreaView>
	) : (
		<NotFoundComponent missingThing="any changelog" {...{ screenInfo: screenDimension }} />
	);
};

function GridDataTableComponent({ itemList, screenDimension, OnItemPress }) {
	return (
		<ScrollView horizontal={true}>
			<View style={{ flex: 1 }}>
				<Table style={{ borderColor: '#a5a5a5', borderLeftWidth: 1 }}>
					<Row
						data={itemList?.Header}
						widthArr={setColumnWidth(itemList?.Header)}
						style={[styles.header, { minWidth: screenDimension?.width * 0.915 }]}
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

							let recordDetailParam = {};
							let rowData = Object.values(noIdRecord)?.map((value, valueIndex) => {
								if (typeof value === 'object') {
									recordDetailParam = value;
									return 'Detail';
								} else {
									return value;
								}
							});

							return (
								<Pressable
									onPress={() => OnItemPress(recordDetailParam)}
									key={index}
									style={({ pressed }) => ({
										backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
									})}>
									<Row
										key={index}
										data={rowData}
										widthArr={setColumnWidth(rowData)}
										style={[styles.row, { minWidth: screenDimension?.width * 0.915 }]}
										textStyle={styles.text}
										height={40}
									/>
								</Pressable>
							);
						})}
					</ScrollView>
				</Table>
			</View>
		</ScrollView>
	);
}

function setColumnWidth(rowData) {
	let widthArr = [];
	if (rowData && rowData.length) {
		rowData.forEach(() => {
			widthArr.push(100);
		});
	}
	return widthArr;
}

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
		flex: 1,
		height: 50,
		backgroundColor: '#f5f5f5',
		justifyContent: 'flex-start',
		borderBottomColor: '#e5e5e5',
		borderBottomWidth: 1
	},
	text: { textAlign: 'left', fontWeight: '100', marginLeft: 8 },
	dataWrapper: { marginTop: -1 },
	row: { height: 70, borderBottomColor: '#e5e5e5', borderBottomWidth: 0.8, alignItems: 'center' }
});

export default ModuleChangelog;
