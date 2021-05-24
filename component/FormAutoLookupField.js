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
	ScrollView
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useController, useFormContext } from 'react-hook-form';
import { RestClient } from '../helper/RestClient';
import AuthContext from './../context/AuthContext';
import ModuleContext from './../context/ModuleContext';
import { Button, Input, Overlay } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ThemeColor from '../constants/ThemeColor';
import { ChecklistLookupAPI } from '../helper/MockWitlyAPI';
import { InputStyle } from '../styles/component/InputStyle';
import { ConvertApiName } from '../helper/StringUtils';
import { BASE_URL } from '../constants/Globals';

export const FormAutoLookupField = (props) => {
	const { name, rules, defaultValue = '', ...lookupProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });

	return (
		<AutoLookupField
			{...lookupProps}
			error={errors[name]?.message}
			onChangeText={(value) => {
				field.onChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
			fieldName={name}
		/>
	);
};

export const AutoLookupField = ({ error, onChangeText, onBlur, ...lookupProps }) => {
	const isError = Boolean(error);
	const { value = '', fieldName, iconName = '', isUserLookup = false } = lookupProps;
	const [isLoading, setIsLoading] = React.useState(false);
	const [showPopup, setShowPopup] = React.useState(false);
	const [lookupData, setLookupData] = React.useState(null);
	const [page, setPage] = React.useState(1);

	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);

	const screenDimension = useWindowDimensions();

	React.useEffect(() => {
		setLookupData(null);
		//console.log('querying by main input value', value);
		LookupListCompiler(QueryLookupList({ fieldName: fieldName, queryValue: value, page: page }));
		return () => {};
	}, [value]);

	async function QueryLookupList(queryParameters) {
		setIsLoading(true);
		let param = new URLSearchParams({
			token: userData?.Token,
			page: queryParameters.page,
			field: queryParameters.fieldName
			//query: queryParameters.queryValue
		});

		const url = `/${ConvertApiName(
			ModuleInfo.GetModuleInfoState().moduleName
		)}/lookup?${param.toString()}`;

		const userListUrl = `/user-list?${param.toString()}`;
		let actuallyUrl = isUserLookup ? userListUrl : url;
		//console.log('[FormAutoLookupField] QueryLookupList', actuallyUrl);
		return await RestClientInstance().get(actuallyUrl);
	}

	function LookupListCompiler(PromiseResult) {
		PromiseResult.then((responseData) => {
			if (isUserLookup) {
				//console.log('[FormAutoLookupField] LookupListCompiler', responseData?.data);
				let recordsList = responseData?.data?.map((item, index) => {
					if ('id' in item) {
						delete item.id;
					}
					return { Name: item?.Name };
				});

				setLookupData({
					Header: Object.keys(recordsList[0]),
					Records: recordsList.filter((record) => record.Name.includes(value))
				});
			} else {
				if (responseData?.data?.ListValue) {
					//console.log('[FormAutoLookupField] LookupListCompiler', responseData?.data);
					let recordsList = responseData?.data?.ListValue.map((item, index) => {
						if ('id' in item) {
							delete item.id;
						}
						return item;
					});
					setLookupData({ Header: Object.keys(recordsList[0]), Records: recordsList });
				}
			}

			setIsLoading(false);
		})
			.catch(function (errorResp) {
				console.log('[FormAutoLookupField] LookupListCompiler', errorResp);
				// handle error
				setIsLoading(false);
			})
			.finally(function () {
				// always executed
				setIsLoading(false);
			});
	}

	return (
		<View style={lookupStyle.container}>
			<Input
				value={value}
				leftIconContainerStyle={{ marginEnd: 10 }}
				containerStyle={lookupInputStyle.container}
				inputContainerStyle={lookupInputStyle.inputContainer}
				onBlur={onBlur}
				onChangeText={(userText) => {
					//setQuery(userText);
					onChangeText(userText);
				}}
				errorMessage={isError ? error : ''}
			/>
			<Button
				type="outline"
				style={lookupStyle.searchBtn}
				buttonStyle={{
					borderColor: ThemeColor.BORDER,
					borderWidth: 1,
					marginStart: 2
				}}
				onPress={() => setShowPopup(true)}
				icon={<Icon name="search-web" size={31} color="#6e6e6e" />}
			/>
			<Overlay
				overlayStyle={{
					paddingBottom: 20,
					backgroundColor: '#FFF',
					width: '80%',
					maxHeight: '90%'
					//height: '80%'
				}}
				children={() => <Text>sssss</Text>}
				ModalComponent={Modal}
				isVisible={showPopup}
				onBackdropPress={() => setShowPopup(!showPopup)}>
				<View>
					<Input
						containerStyle={InputStyle.container}
						inputContainerStyle={InputStyle.inputContainer}
						inputStyle={{ width: '80%', paddingHorizontal: 16 }}
						value={value}
						onChangeText={(userText) => {
							onChangeText(userText);
							//setQuery(userText);
						}}
					/>
					{lookupData !== null ? (
						<GridDataTableComponent {...lookupData} />
					) : (
						<ActivityIndicator size="small" animating={true} color={ThemeColor.PRIMARY} />
					)}
				</View>
			</Overlay>
		</View>
	);

	function GridDataTableComponent(itemList) {
		return (
			<ScrollView horizontal={true}>
				<View>
					<Table>
						<Row
							flexArr={[1, 1]}
							//widthArr={setColumnWidth(itemList?.Header)}
							data={itemList?.Header}
							style={[gridTableStyles.header, { minWidth: screenDimension?.width * 0.74 }]}
							textStyle={gridTableStyles.text}
						/>
						<ScrollView
							style={[gridTableStyles.dataWrapper, { minWidth: screenDimension?.width * 0.74 }]}>
							{itemList?.Records.flatMap((record) => record).map((record, index) => {
								let extId = '';
								let noIdRecord = Object.assign({}, record);
								if ('id' in noIdRecord) {
									extId = noIdRecord.id;
									delete noIdRecord.id;
								}

								let rowData = Object.values(noIdRecord);

								return (
									<Pressable
										onPress={() => {
											setShowPopup(!showPopup);
											onChangeText(rowData[0]);
										}}
										key={index}
										style={({ pressed }) => ({
											backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
										})}>
										<Row
											key={index}
											data={rowData}
											flexArr={[1, 1]}
											//widthArr={setColumnWidth(itemList?.Header)}
											style={[gridTableStyles.row]}
											textStyle={gridTableStyles.text}
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
};

function setColumnWidth(rowData) {
	let widthArr = [];
	if (rowData && rowData.length) {
		rowData.forEach(() => {
			widthArr.push(100);
		});
	}
	return widthArr;
}

const lookupStyle = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	searchBtn: {
		flex: 2,
		height: 50,
		marginBottom: 20,
		paddingHorizontal: 16
	}
});
const lookupInputStyle = StyleSheet.create({
	container: {
		flex: 8,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: ThemeColor.BORDER,
		//borderEndWidth: 0,
		height: 50,
		marginBottom: 20,
		paddingVertical: 6,
		paddingHorizontal: 15
	},
	inputContainer: {
		borderBottomWidth: 0
	}
});

const gridTableStyles = StyleSheet.create({
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
	dataWrapper: { marginTop: 0, maxHeight: '80%', backgroundColor: '#aa1122' },
	row: { height: 70, borderBottomColor: '#e5e5e5', borderBottomWidth: 0.8, alignItems: 'center' }
});
