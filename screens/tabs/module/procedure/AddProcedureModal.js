/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Button, ListItem } from 'react-native-elements';
import ThemeColor from '../../../../constants/ThemeColor';
import MainStyles from '../../../../styles/MainStyle';
import SectionStyle from '../../../../styles/component/SectionStyle';
import { InputField } from '../../../../component/FormInputField';
import {
	ConvertApiName,
	IsEmptyOrNullOrUndefined,
	isObjectEmpty
} from '../../../../helper/StringUtils';
import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
export const AddProcedure = ({
	recordId,
	selectedProcedure,
	setSelectedProcedure,
	...componentProps
}) => {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);

	const [visible, setVisible] = React.useState(false);
	const [procedureList, setProcedureList] = React.useState([]);
	const [filterList, setFilterList] = React.useState([]);

	console.log('first render AddProcedure', selectedProcedure);
	React.useEffect(() => {
		FetchProcedureTemplateList();

		return () => {
			console.log('Cleanup AddProcedure');
			//setProcedureList([]);
			//setFilterList([]);
		};
	}, []);

	function FilterProcList(query) {
		if (IsEmptyOrNullOrUndefined(query)) {
			setFilterList(procedureList);
		} else {
			const filtered = procedureList.filter((pcd) => pcd?.name?.includes(query));
			setFilterList(filtered);
		}
	}

	async function FetchProcedureTemplateList() {
		try {
			const query = new URLSearchParams({
				token: userData?.Token
			});

			const url = `/procedure/list?${query.toString()}`;
			//console.log('[Bind-procedure] url', url);
			await RestClientInstance()
				.get(url)
				.then(
					(resp) => {
						setProcedureList(resp?.data);
						setFilterList(resp?.data);
					},
					(reject) => {
						setProcedureList([]);
						setFilterList([]);
					}
				)
				.catch((errResp) => {
					console.info('[FetchProcedureTemplateList] Error', errResp);
				})
				.finally(() => {});
		} catch (exception) {
			console.log('[FetchProcedureTemplateList] Catch exception', exception);
		}
	}

	const TemplateListComponent = () => {
		return (
			<>
				<Text style={MainStyles.fieldName}>My Templates</Text>
				<View style={{ borderColor: ThemeColor.BORDER, borderWidth: 1, flex: 1 }}>
					<ScrollView
						contentContainerStyle={{ flexGrow: 1 }}
						style={{}}
						showsHorizontalScrollIndicator={true}>
						{filterList?.map((procedure, index) => {
							return (
								<ListItem
									onPress={() => {
										setSelectedProcedure(procedure);
										setVisible(false);
									}}
									key={index}>
									<Icon name="clipboard-text" size={50} color={ThemeColor.BaseComponent} />
									<ListItem.Content>
										<ListItem.Title>{procedure?.name}</ListItem.Title>
									</ListItem.Content>
								</ListItem>
							);
						})}
					</ScrollView>
				</View>
			</>
		);
	};

	return (
		<View style={[SectionStyle.container, ProcedureStyles.container]} key={1}>
			<Modal
				animationType="fade"
				//transparent={true}
				visible={visible}
				onRequestClose={() => {
					setVisible(!visible);
				}}>
				<View style={ProcedureStyles.pickerContainer}>
					<Text style={MainStyles.fieldName}>Choose procedure template</Text>
					<Pressable
						onPress={() => setVisible(!visible)}
						style={{ position: 'absolute', right: 20, top: 20 }}>
						<Icon name="close" size={30} color={ThemeColor.BaseComponent} />
					</Pressable>
					<View style={{ marginTop: 20 }}>
						<InputField
							iconName="magnify"
							onChangeText={(value) => {
								let timeoutId;
								clearTimeout(timeoutId);
								timeoutId = setTimeout(() => {
									console.log('query in typing!', value);
									FilterProcList(value);
								}, 1000);
							}}
							onBlur={() => {}}
						/>
					</View>
					<TemplateListComponent />
				</View>
			</Modal>
			<View style={SectionStyle.header}>
				<Text style={SectionStyle.headerText}>Procedure</Text>
			</View>
			{isObjectEmpty(selectedProcedure) ? (
				<View key={1} style={MainStyles.fieldView}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon
							name="menu"
							size={20}
							color={ThemeColor.BaseComponent}
							style={{ marginEnd: 10 }}
						/>
						<Text style={ProcedureStyles.introduceTxt}>
							Create or attach new Form, Procedure or Checklist
						</Text>
					</View>
					<Button
						//onPress={() => navigation.navigate('BindProcedureTemplate', {})}
						onPress={() => setVisible(true)}
						type="outline"
						title="Add Procedure"
						style={ProcedureStyles.AddBtn}
						icon={<Icon name="plus" size={20} color={ThemeColor.PRIMARY} />}
					/>
				</View>
			) : (
				<ListItem style={ProcedureStyles.selectedProcedure}>
					<Icon name="clipboard-text" size={50} color={ThemeColor.BaseComponent} />
					<ListItem.Content>
						<ListItem.Title>{selectedProcedure?.name}</ListItem.Title>
					</ListItem.Content>
					<Pressable
						onPress={() => {
							setSelectedProcedure({});
						}}>
						<Icon name="close-circle" size={30} color={ThemeColor.DANGER} />
					</Pressable>
				</ListItem>
			)}
		</View>
	);
};

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
