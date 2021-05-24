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
import { DataTable } from 'react-native-paper';
import { Table, Row } from 'react-native-table-component';
import LoadingStyle from '../../../../styles/component/LoadingStyle';
import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import ThemeColor from '../../../../constants/ThemeColor';
import { GetValueFromObject } from '../../../../helper/ObjectUtils';
import { ConvertApiName, IsEmptyOrNullOrUndefined } from '../../../../helper/StringUtils';
import { GridDataTableComponent } from '../../../../component/GridTableComponent';
import { FloatingButton } from '../../../../component/MyFloatingButton';
import { BottomSheetListComponent } from '../../../../component/BottomSheetComponent';
import { CreateBottomSheetOptions } from '../ModuleScreenManager';
import { showMessage } from 'react-native-flash-message';

const sharingData = {
	Header: ['Share To', 'Access Level', 'Share Role', 'Share By'],
	Records: [
		{
			'Share To': 'Minor Admin',
			'Access Level': 'Read/Edit',
			'Share Role': 'FirstRole',
			'Share By': 'Dev Easset'
		},
		{
			'Share To': 'Major Admin',
			'Access Level': 'Read Only',
			'Share Role': 'ReadRole',
			'Share By': 'Dev Easset'
		}
	]
};

const ModuleSharing = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = React.useState(true);
	const [recordViewList, setRecordViewList] = React.useState(null);
	const [refreshing, setRefreshing] = React.useState(false);
	const [actions, setActions] = React.useState([]);
	const screenDimension = useWindowDimensions();

	const ModuleInfo = React.useContext(ModuleContext);

	const extId = ModuleInfo.GetModuleInfoState()?.detailData
		? ModuleInfo.GetModuleInfoState().detailData?.id
		: '';

	//pagination
	const itemsPerPage = 20;
	const [page, setPage] = React.useState(0);
	const from = page * itemsPerPage;
	const to = (page + 1) * itemsPerPage;

	React.useEffect(() => {
		const selectedModuleName = ModuleInfo.GetModuleInfoState().moduleName;
		const ExtId = ModuleInfo.GetModuleInfoState().detailData?.id;

		navigation.setOptions({
			title: selectedModuleName
				? `${selectedModuleName} - Sharing`
				: `${ModuleInfo.GetModuleInfoState().moduleName} - Sharing`
		});

		setActions([
			{
				title: 'Sharing To',
				icon: 'share-variant',
				Location: 'Detail',
				nextPage: 'ModuleSharingNew',
				ActionBeforeNext: () => {
					navigation.navigate('ModuleSharingNew', { ExtId: extId });
				},
				needDialog: false,
				dialogMessages: {}
			},
			{
				title: 'Clear',
				icon: 'trash-can',
				Location: 'Detail',
				nextPage: '',
				ActionBeforeNext: OnClearSharing,
				needDialog: true,
				dialogMessages: {
					title: 'Clear all sharing.',
					body: 'Do you want to remove those sharing?',
					yes: 'Yes',
					no: 'Cancel'
				}
			}
		]);

		FetchSharingData(ExtId);
	}, []);

	async function FetchSharingData(externalId) {
		try {
			const query = new URLSearchParams({
				token: userData?.Token,
				id: externalId,
				page: page + 1,
				size: itemsPerPage
			});
			let url = `/${ConvertApiName(
				ModuleInfo.GetModuleInfoState().moduleName
			)}/sharing?${query.toString()}`;
			await RestClientInstance()
				.get(url)
				.then(
					(resp) => {
						console.log('FetchSharingData success', resp?.data);
						setRecordViewList(resp?.data);
					},
					(reject) => {
						console.log('FetchSharingData Reject', reject);
					}
				)
				.catch((errResp) => {
					console.log('FetchSharingData catch', errResp);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (exception) {
			console.log('FetchSharingData exception', exception);
			setIsLoading(false);
		}
	}

	const OnClearSharing = async () => {
		console.log('CLEAR !');

		//setDialogVisible(true);
		setIsLoading(true);

		//Delete record item
		const query = new URLSearchParams({
			token: userData?.Token,
			id: extId
		});

		const url = `/${ConvertApiName(
			ModuleInfo.GetModuleInfoState().moduleName
		)}/sharing?${query.toString()}`;

		console.log(url);

		await RestClientInstance()
			.delete(url)
			.then(
				(resp) => {
					showMessage({
						message: 'Clear all sharing successfully.',
						type: 'success'
					});
					navigation.pop();
				},
				(reject) => {
					showMessage({
						message: 'Clear all sharing failed.',
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

	const onRefresh = React.useCallback(() => {}, []);

	/*Bottom Sheet Varaiable */
	// ref
	const refRBSheet = React.useRef();

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start' }}>
				<View style={styles.container}>
					<GridDataTableComponent
						itemList={recordViewList}
						screenDimension={screenDimension}
						OnItemPress={() => {}}
					/>
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
export default ModuleSharing;
