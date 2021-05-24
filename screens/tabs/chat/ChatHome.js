/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { ListItem, Avatar } from 'react-native-elements';
import { Text, TouchableHighlight, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import AuthContext from '../../../context/AuthContext';
import ModuleContext from '../../../context/ModuleContext';
import { BuildImageSource, IsEmptyOrNullOrUndefined } from '../../../helper/StringUtils';
import LoadingStyle from '../../../styles/component/LoadingStyle';
import { ScrollView } from 'react-native';
import { FloatingTextButton, FloatingButton } from '../../../component/MyFloatingButton';
import ThemeColor from '../../../constants/ThemeColor';
import { BASE_URL } from '../../../constants/Globals';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { BottomSheetListComponent } from '../../../component/BottomSheetComponent';

export default function ChatHome({ navigation, route }) {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const [contactList, SetContactList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [targetItem, setTargetItem] = React.useState('');

	const refRBSheet = React.useRef();
	const isFocused = useIsFocused();

	async function FetchListOfContacts() {
		// [GET] api/v2/chat/list?token={user_token}
		setIsLoading(true);
		let query = new URLSearchParams({
			token: userData?.Token
		});
		const url = BASE_URL + 'chat/list?' + query.toString();

		await RestClientInstance()
			.get(url)
			.then(
				(response) => {
					//console.log('get chat room list: success', response?.data);
					SetContactList(response?.data);
				},
				(reject) => {
					showMessage({ message: 'Fetch chat history failed because ' + reject, type: 'danger' });
					//console.log('get chat room list: reject', reject);
				}
			)
			.catch((ex) => {})
			.finally(() => {
				setIsLoading(false);
			});

		setIsLoading(false);
	}

	React.useEffect(() => {
		FetchListOfContacts();

		return () => {
			console.log('Leave from ChatHome.');
		};
	}, [isFocused]);

	function CreateContactItemList(chatHistory) {
		/* const ImageUri = BuildImageSource(
			IsEmptyOrNullOrUndefined(chatHistory?.room_image['Image Url'])
				? ''
				: chatHistory?.room_image['Image Url']
		); */
		const ImageUri = require('./../../../assets/chat.png');
		return (
			<View key={chatHistory?.Id}>
				<ListItem
					Component={TouchableHighlight}
					containerStyle={{}}
					disabledStyle={{ opacity: 0.5 }}
					onLongPress={() => {
						setTargetItem(chatHistory?.Id);
						refRBSheet.current.open();
					}}
					onPress={() =>
						navigation.navigate('ChatMessage', {
							chatGroupId: chatHistory?.Id,
							chatGroupInfo: chatHistory
						})
					}
					pad={20}>
					<Avatar source={ImageUri} />
					<ListItem.Content>
						<ListItem.Title numberOfLines={1}>
							<Text>{chatHistory?.Group_Name}</Text>
						</ListItem.Title>
						<ListItem.Subtitle numberOfLines={1}>
							<Text style={{}}>{chatHistory?.latest_message?.send}: </Text>
							<Text>{chatHistory?.latest_message?.message}</Text>
						</ListItem.Subtitle>
						<ListItem.Subtitle numberOfLines={1}>
							<Text style={{ fontSize: 11 }}>{chatHistory?.latest_message?.send_date}</Text>
						</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			</View>
		);
	}

	const actionList = [
		{
			title: 'Delete a conversation.',
			icon: 'delete-outline',
			Location: '',
			nextPage: '',
			ActionBeforeNext: () => DeleteGroupHandler(),
			needDialog: true,
			dialogMessages: {
				title: 'Remove',
				body: 'Do you want to remove this conversation ?',
				yes: 'Yes',
				no: 'Cancel'
			}
		}
	];

	const DeleteGroupHandler = async () => {
		setIsLoading(true);

		let query = new URLSearchParams({
			token: userData?.Token,
			id: targetItem
		});
		const url = BASE_URL + 'chat/delete-group?' + query.toString();
		console.log(url);
		await RestClientInstance()
			.delete(url)
			.then(
				(response) => {
					if (response?.data?.Result && response?.data?.Result === true) {
						//Deleted
						showMessage({
							message: 'This conversation was deleted. ',
							type: 'success'
						});
						FetchListOfContacts();
					} else {
						showMessage({ message: 'Failed to delete the conversation. ', type: 'danger' });
					}
				},
				(reject) => {
					showMessage({ message: 'Failed to delete the conversation. ' + reject, type: 'danger' });
				}
			)
			.catch((ex) => {
				showMessage({ message: 'Failed to delete the conversation. ' + ex, type: 'danger' });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				{contactList?.map((chatHistory, index) => {
					return <CreateContactItemList key={index} {...chatHistory} />;
				})}
			</ScrollView>
			<FloatingTextButton
				icon="plus"
				text="Create New Chat"
				size={30}
				color={ThemeColor.PRIMARY}
				onPress={() => navigation.navigate('NewChat')}
			/>

			<BottomSheetListComponent
				RefRBSheet={refRBSheet}
				Navigation={navigation}
				Title="Chat Actions"
				ActionList={actionList}
			/>
		</SafeAreaView>
	);
}
