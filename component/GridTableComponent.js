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
import LoadingStyle from '../styles/component/LoadingStyle';
import { Table, Row } from 'react-native-table-component';
import { Button, Card, ListItem } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import NotFoundComponent from '../component/NotFoundComponent';
import { DataTable } from 'react-native-paper';
import ThemeColor from '../constants/ThemeColor';

export function GridDataTableComponent({ itemList, screenDimension, OnItemPress }) {
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
