/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import BottomSheetStyles from '../styles/component/BottomSheetStyles';
import { Pressable } from 'react-native';
import ThemeColor from '../constants/ThemeColor';
import Dialog from 'react-native-dialog';

function CalHeight(itemAmount) {
	if (itemAmount === 0) {
		return 140;
	} else if (itemAmount > 0 && itemAmount <= 5) {
		return 140 + 50 * (itemAmount - 1);
	} else if (itemAmount > 0 && itemAmount > 5) {
		return 140 + 50 * (5 - 1);
	}
}
export const BottomSheetListComponent = (props) => {
	const { RefRBSheet, Navigation, Title = '', ActionList = [] } = props;
	const [dialogVisible, setDialogVisible] = React.useState(false);
	const [dialogInfo, setDialogInfo] = React.useState({});
	const [selectedAction, setSelectedAction] = React.useState({});

	const OnDialogOK = (action) => {
		selectedAction?.ActionBeforeNext(action);
		setDialogVisible(false);
		RefRBSheet.current.close();
	};
	const OnDialogCancel = (selectedAction) => {
		setDialogVisible(false);
	};
	return (
		<RBSheet
			onClose={() => {
				setDialogVisible(false);
			}}
			ref={RefRBSheet}
			closeOnDragDown={true}
			closeOnPressMask={true}
			height={CalHeight(ActionList?.length)}
			customStyles={{
				wrapper: {
					backgroundColor: 'rgba(52, 52, 52, 0.8)'
				},
				container: {
					elevation: 100
				},
				draggableIcon: {
					backgroundColor: '#000'
				}
			}}>
			<ScrollView>
				<Text style={BottomSheetStyles.listTitle}>{Title}</Text>
				<View>
					{ActionList.map((action, index) => {
						return (
							<Pressable
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
									},
									{
										paddingHorizontal: 25,
										flex: 1,
										flexDirection: 'row',
										height: 50,
										alignItems: 'center'
									}
								]}
								key={'btn_' + index}
								onPress={() => {
									setSelectedAction(action);
									if (action?.needDialog) {
										setDialogVisible(true);
									} else {
										action?.ActionBeforeNext(action);
										RefRBSheet.current.close();
									}
								}}>
								<Icon name={action?.icon} size={26} color="#6e6e6e" />
								<Text style={BottomSheetStyles.listItem}>{action?.title}</Text>
							</Pressable>
						);
					})}
				</View>
			</ScrollView>
			<Dialog.Container visible={dialogVisible}>
				<Dialog.Title>
					{selectedAction?.dialogMessages?.title ? selectedAction?.dialogMessages?.title : ''}
				</Dialog.Title>
				<Dialog.Description>
					{selectedAction?.dialogMessages?.body ? selectedAction?.dialogMessages?.body : ''}
				</Dialog.Description>
				<Dialog.Button
					label={selectedAction?.dialogMessages?.no ? selectedAction?.dialogMessages?.no : ''}
					onPress={() => {
						OnDialogCancel(selectedAction);
					}}
				/>
				<Dialog.Button
					label={selectedAction?.dialogMessages?.yes ? selectedAction?.dialogMessages?.yes : ''}
					onPress={() => OnDialogOK(selectedAction)}
				/>
			</Dialog.Container>
		</RBSheet>
	);
};

export const BottomSheetGridComponent = (props) => {
	const { RefRBSheet, Navigation, Title = '', ActionList = [] } = props;

	return (
		<RBSheet
			ref={RefRBSheet}
			closeOnDragDown={true}
			closeOnPressMask={true}
			height={140 + 60 * (ActionList.length - 1)}
			customStyles={{
				wrapper: {
					backgroundColor: 'rgba(52, 52, 52, 0.8)'
				},
				container: {
					elevation: 100
				},
				draggableIcon: {
					backgroundColor: '#000'
				}
			}}>
			<Text style={BottomSheetStyles.listTitle}>{Title}</Text>
			<ScrollView>
				<View>
					{ActionList.map((action, index) => (
						<ListItem
							style={{ zIndex: 100 }}
							key={index}
							Component={TouchableHighlight}
							containerStyle={{ paddingHorizontal: 25 }}
							disabledStyle={{ opacity: 0.5 }}
							onLongPress={() => {
								RefRBSheet.current.close();
								Navigation.navigate(action.nextPage);
							}}
							onPress={() => {
								RefRBSheet.current.close();
								Navigation.navigate(action.nextPage);
							}}
							pad={32}>
							<Icon name={action.icon} size={26} color="#6e6e6e" />
							<ListItem.Content>
								<ListItem.Subtitle>
									<Text style={BottomSheetStyles.listItem}>{action.title}</Text>
								</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					))}
				</View>
			</ScrollView>
		</RBSheet>
	);
};
