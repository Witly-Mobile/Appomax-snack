import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GiftedChat, Message } from 'react-native-gifted-chat';
import { Text, TouchableHighlight, View, ActivityIndicator } from 'react-native';

import AuthContext from './../../../context/AuthContext';
import ModuleContext from './../../../context/ModuleContext';
import { IsEmptyOrNullOrUndefined, isObjectEmpty } from '../../../helper/StringUtils';
import LoadingStyle from '../../../styles/component/LoadingStyle';

export default function ChatMessage({ navigation, route }) {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const [isLoading, setIsLoading] = React.useState(true);
	const [chatGroupInfo, setChatGroupInfo] = React.useState({});

	const [currentMessages, setCurrentMessages] = React.useState([]);
	const [page, setPage] = React.useState(1);

	const sampleChatGroupInfo = {
		Chat_Group: {
			Id: 2,
			ExternalId: 'd7ddf0ac-df21-4276-ae82-0402875450b5',
			GroupType: 2,
			GroupName: 'Personal',
			LstChatGroupMembers: [
				{
					Id: 4,
					ExternalId: '38b75794-16d2-4563-99cd-fc788fba37e2',
					ChatGroupId: 2,
					UserId: 78,
					NewMsgFlag: false,
					NewMsgCount: 0,
					ProfilePictureId: 134628,
					MemberImage: {
						Name: 'tenor.gif',
						'Content Type': 'image/gif',
						'Storage Id': '69df1eb5-f54d-435d-9ab1-69a04887a442',
						'Image Url':
							'http://localhost:8181/secure/res/EASSET/Assets/Field-Images/202104/3d177531-0aa1-4662-9a04-54cd3212a8a7.gif'
					}
				},
				{
					Id: 5,
					ExternalId: '7f7bd99b-6e1a-4ce4-961d-8941d51360f2',
					ChatGroupId: 2,
					UserId: 256,
					NewMsgFlag: false,
					NewMsgCount: 0,
					ProfilePictureId: 0,
					MemberImage: {}
				}
			],
			LstChatMessages: [
				{
					Id: 21,
					ExternalId: 'e22edb1b-b414-42e6-a7fe-e810cdcbf21b',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: '345',
					SendDate: '2021-03-30T14:27:10',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 22,
					ExternalId: 'c5706d8e-e298-412b-b0b3-97f196fa489a',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'Very Hardddddddddddd.',
					SendDate: '2021-03-30T14:28:38',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 23,
					ExternalId: '6095ec44-f281-40fa-ab66-d82a68f11247',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'Continue.',
					SendDate: '2021-03-30T14:28:50',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 24,
					ExternalId: '1eadcc2e-8885-4792-a55a-610aee2ab71f',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: '555 I did it',
					SendDate: '2021-03-30T14:29:12',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 25,
					ExternalId: 'dba09910-aaef-4e0e-860c-2d16c0e94c79',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'ภาษาไทยบ้าง',
					SendDate: '2021-03-30T14:29:45',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 26,
					ExternalId: 'a340d47a-764d-42b8-bd67-164b7d52beb1',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'abc',
					SendDate: '2021-03-30T14:48:49',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 27,
					ExternalId: 'c919df3d-4af2-4485-ade1-0ad21e14931d',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'def',
					SendDate: '2021-03-30T14:49:11',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 28,
					ExternalId: 'a33d9d5e-62dd-43f6-92c9-0c28d8ffda92',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'ไรเนี่ยยยย',
					SendDate: '2021-03-30T14:49:44',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 29,
					ExternalId: '79a61a2d-5bd8-4a7a-b2a5-7f49c9f318db',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: '111',
					SendDate: '2021-03-30T14:52:21',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 30,
					ExternalId: 'b4538434-cfe9-418c-a426-eb45157f0e0d',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'aaa',
					SendDate: '2021-03-30T14:55:08',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 31,
					ExternalId: '6cb7e4d0-ba80-418b-8d4f-8b184cc98d76',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'testๆ',
					SendDate: '2021-03-30T14:59:48',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 32,
					ExternalId: '90fe93ef-c689-4491-b053-f534ff3b43e1',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: '132',
					SendDate: '2021-03-30T15:07:28',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 33,
					ExternalId: '4aa052ac-fba8-4fe9-9a31-243a46b64855',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'con',
					SendDate: '2021-03-30T15:08:29',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 34,
					ExternalId: 'e7551bf4-cc6a-4906-90dd-e71b6c4b4a29',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'OK...',
					SendDate: '2021-03-30T15:09:05',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 35,
					ExternalId: 'f26d2adc-fb36-42a9-9de1-1e2eb026a55e',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'Whattttt',
					SendDate: '2021-03-30T15:10:09',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 36,
					ExternalId: '6ce65c0b-24fe-4984-95c8-38a323d7a155',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'ต่อๆ',
					SendDate: '2021-03-30T15:10:54',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 37,
					ExternalId: '10a31c9b-5bfc-4ae6-b637-5bbe9383dfd1',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'กลับมาาาาาาาา',
					SendDate: '2021-03-30T15:11:12',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 38,
					ExternalId: '84cf2f13-24b6-4026-9a43-91187b8e571e',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'คุยต่อนะ',
					SendDate: '2021-03-30T16:42:51',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 39,
					ExternalId: 'b9df789f-d909-4308-b1d4-bc3f108b7a5c',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: 'ทำเป็นเงียบ',
					SendDate: '2021-03-30T16:44:07',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				},
				{
					Id: 42,
					ExternalId: '99db610e-3f98-49f6-b5fa-cb8433bed81e',
					ChatGroupId: 2,
					SenderUserId: 78,
					MessageType: 2,
					Message: '123\n456',
					SendDate: '2021-03-30T17:41:01',
					DeleteFlag: false,
					Deletable: true,
					SenderName: 'Witly Admin01511',
					DisplaySendDateTime: '',
					IsNewGroup: false
				}
			],
			DisplayUserId: 0,
			ClnId: 'U2+kNnR649WkUTF8/3iRjg==',
			LastMessage: {
				Id: 0,
				ExternalId: '',
				ChatGroupId: 0,
				SenderUserId: 0,
				MessageType: 0,
				Message: '',
				SendDate: '0001-01-01T00:00:00',
				DeleteFlag: false,
				Deletable: false,
				SenderName: '',
				DisplaySendDateTime: '',
				IsNewGroup: false
			},
			ChatToUsers: '',
			NewMsgFlag: false
		}
	};

	React.useState(() => {
		return () => {
			setCurrentMessages([]);
			setPage(1);
		};
	}, []);

	React.useEffect(() => {
		let chatGroupId = route.params?.chatGroupId;

		async function FetchChatGroupInfo(groupId) {
			//URL: [GET] api/v2/chat?token={user_token}&id={chat_group_id}
			const query = new URLSearchParams({
				token: userData?.Token,
				id: groupId
			});

			const url = `/chat/room?${query.toString()}`;
			await RestClientInstance()
				.get(url)
				.then((response) => response?.data)
				.then((chatGroupInfoData) => {
					//console.log('Profile id', profile?.id, profile?.Name, chatGroupInfoData?.Chat_Group);
					setChatGroupInfo(chatGroupInfoData?.Chat_Group);
				})
				.catch((error) => {})
				.finally(() => {});
		}

		if (!IsEmptyOrNullOrUndefined(chatGroupId)) {
			//Load chat room Info
			FetchChatGroupInfo(chatGroupId);
		} else {
			setIsLoading(false);
		}

		return () => {
			chatGroupId = '';
			//clearTimeout(timeOutId);
		};
	}, []);

	React.useEffect(() => {
		if (!isObjectEmpty(chatGroupInfo)) {
			navigation.setOptions({
				headerTitle: chatGroupInfo?.GroupName
			});
			const latestMessages = PrepareMessage(
				chatGroupInfo?.LstChatMessages,
				chatGroupInfo?.LstChatGroupMembers
			);
			setCurrentMessages(latestMessages);
			setIsLoading(false);
		}
	}, [chatGroupInfo]);

	function PrepareMessage(LstChatMessages, LstChatGroupMembers) {
		//console.log('PrepareMessage', Array.from(LstChatMessages));
		return Array.from(LstChatMessages)
			?.sort()
			.reverse()
			?.map((msg) => {
				const sender = LstChatGroupMembers?.find((member) => member.UserId === msg?.SenderUserId);

				//console.log('sender external id:', sender?.ExternalId);
				return {
					_id: msg?.Id,
					createdAt: msg?.SendDate,
					text: msg?.Message,
					//sent: true,
					user: {
						_id: msg?.SenderUserExtId,
						name: msg?.SenderName,
						avatar: sender?.MemberImage['Image Url']
					}
				};
			});
	}

	const OnLoadEarlier = async () => {
		let nextPage = page + 1;
		const query = new URLSearchParams({
			token: userData?.Token,
			id: route.params?.chatGroupId,
			current: nextPage
		});

		const url = `/chat/messages?${query.toString()}`;
		console.log('OnLoadEarlier', url);
		await RestClientInstance()
			.get(url)
			.then((response) => response?.data)
			.then((data) => {
				const messagesList = data?.Chat_Messages;
				const latestMessages = PrepareMessage(messagesList, chatGroupInfo?.LstChatGroupMembers);

				const entireMessages = GiftedChat.append(currentMessages, latestMessages);
				//console.log(messages?.length, messagesList.length, entireMessages?.length);

				setCurrentMessages(entireMessages);
				setPage(nextPage);
			})
			.catch((error) => {})
			.finally(() => {});
	};

	const onSend = React.useCallback(
		(newMessages = []) => {
			newMessages?.forEach(async (newMsg) => {
				const query = new URLSearchParams({
					token: userData?.Token,
					id: route.params?.chatGroupId
				});

				const url = `/chat/messages?${query.toString()}`;
				console.log('onSend', url);
				await RestClientInstance()
					.put(url, { Message: newMsg?.text, MessageType: 1 })
					.then(
						(response) => {
							newMsg.sent = true;
							const afterSend = GiftedChat.append(currentMessages, newMsg);
							setCurrentMessages(afterSend);
						},
						(reject) => {
							console.log('Sent failed.', reject);
						}
					)
					.catch((error) => {})
					.finally(() => {});
			});
			//const beforeSend = GiftedChat.append(messages, newMessages);
			setCurrentMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
		},
		[currentMessages]
	);

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<GiftedChat
			loadEarlier={currentMessages?.length < 20 ? false : true}
			onLoadEarlier={OnLoadEarlier}
			infiniteScroll={true}
			messages={currentMessages}
			onSend={(newMsg) => onSend(newMsg)}
			user={{
				_id: profile?.id,
				name: profile?.Name,
				avatar: profile['Profile Picture']['Image Url']
			}}
		/>
	);
}
