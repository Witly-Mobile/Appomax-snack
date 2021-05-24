/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	ScrollView,
	SafeAreaView,
	TouchableHighlight
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { GiftedChat } from 'react-native-gifted-chat';
import { AutoLookupField } from '../../../component/FormAutoLookupField';

import AuthContext from './../../../context/AuthContext';
import ModuleContext from './../../../context/ModuleContext';
import LoadingStyle from '../../../styles/component/LoadingStyle';
import { Text } from 'react-native';
import { InputField } from '../../../component/FormInputField';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import MainStyles from './../../../styles/MainStyle';
import { Avatar, ListItem } from 'react-native-elements';
import { BuildImageSource, IsEmptyOrNullOrUndefined } from '../../../helper/StringUtils';
import InteractivePressable from '../../../component/InteractivePressable';
import ThemeColor from '../../../constants/ThemeColor';
import { BASE_URL } from '../../../constants/Globals';
import { GetValueFromObject, RemoveDuplicateArray } from '../../../helper/ObjectUtils';
import { showMessage, hideMessage } from 'react-native-flash-message';

export default function NewChat({ navigation, route }) {
	const { RestClientInstance, userData, profile } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const [isLoading, setIsLoading] = React.useState(true);

	const [messages, setMessages] = React.useState([]);

	const [allUserList, setAllUserList] = React.useState([]);
	const [filterUserList, setFilterUserList] = React.useState([]);
	const [checkedList, setCheckedList] = React.useState([]);
	const [groupName, setGroupName] = React.useState('');

	React.useLayoutEffect(() => {
		console.log('useLayoutEffect');
		async function createChatRoom() {
			setIsLoading(true);
			const selectedUser = checkedList?.map((user, index) => {
				return { ExternalId: user?.id };
			});

			const chatMembers = RemoveDuplicateArray(selectedUser.concat({ ExternalId: profile?.id }));
			console.log('chatMembers', chatMembers);
			const query = new URLSearchParams({
				token: userData?.Token
			});

			const url = BASE_URL + `/chat/messages?${query.toString()}`;

			await RestClientInstance()
				.post(url, {
					GroupName: groupName,
					LstChatGroupMembers: chatMembers
				})
				.then((resp) => {
					const chatGroupId = resp?.data?.ChatGroup?.ExternalId;
					showMessage({ message: 'Create chat group Successfully', type: 'success' });
					navigation.replace('ChatMessage', {
						chatGroupId: chatGroupId
					});
				})
				.catch((error) => {})
				.finally(() => setIsLoading(false));
		}

		navigation.setOptions({
			headerRight: () => {
				return (
					<InteractivePressable
						onPress={() => {
							createChatRoom();
						}}>
						<Text style={{ color: '#FEFEFE', marginEnd: 15, fontWeight: 'bold' }}>CREATE</Text>
					</InteractivePressable>
				);
			}
		});
	}, [navigation, checkedList]);

	React.useEffect(() => {
		async function FetchListOfUsers() {
			const query = new URLSearchParams({
				token: userData?.Token,
				page: 1,
				size: 100
			});

			const url = BASE_URL + `/user-list?${query.toString()}`;
			await RestClientInstance()
				.get(url)
				.then(
					(resp) => resp?.data,
					(reject) => console.log(reject)
				)
				.then(
					(data) => {
						let userList = [];

						if (data?.length) {
							userList = data?.map((user) => {
								return {
									id: user.id,
									Name: user.Name,
									ProfileImage: GetValueFromObject(user, 'Profile Picture', 'ProfilePicture'),
									isChecked: false
								};
							});
							const excludeCurrent = userList.filter((user) => user?.id !== profile?.id);
							setAllUserList(excludeCurrent);
							setFilterUserList(excludeCurrent);
						}
					},
					(reject) => {
						showMessage({ message: 'Cannot get user list.' + reject, type: 'danger' });
						console.log(reject);
					}
				)
				.catch((error) => {})
				.finally(() => setIsLoading(false));
		}

		FetchListOfUsers();
		setIsLoading(false);
	}, []);

	const handleCheckboxChange = (id) => {
		let temp = filterUserList.map((filterUser) => {
			if (id === filterUser.id) {
				const selectedUser = { ...filterUser, isChecked: !filterUser.isChecked };
				if (selectedUser.isChecked === true) {
					//check dupp
					if (!checkedList.find((user) => user.id === selectedUser.id)) {
						const newCheckedList = checkedList.concat(selectedUser);
						setCheckedList(newCheckedList);
					}
				} else {
					setCheckedList(checkedList.filter((user) => user.id !== selectedUser.id));
				}

				return selectedUser;
			}
			return filterUser;
		});

		setFilterUserList(temp);
	};

	const onSearchChange = (text) => {
		let filter = allUserList.filter((user) => user.Name.includes(text));
		let checkedFilterUser = filter?.map((user) => {
			const foundUser = checkedList?.find((checkedUser) => checkedUser?.id === user?.id);

			if (foundUser) {
				return { ...user, isChecked: foundUser.isChecked };
			} else {
				return user;
			}
		});
		setFilterUserList(checkedFilterUser);
	};

	const CreateContactList = (userInfo) => {
		const ImageUri = BuildImageSource(
			IsEmptyOrNullOrUndefined(userInfo?.ProfileImage['Image Url'])
				? ''
				: userInfo?.ProfileImage['Image Url']
		);
		return (
			<View key={userInfo?.id}>
				<ListItem
					Component={TouchableHighlight}
					containerStyle={{}}
					disabledStyle={{ opacity: 0.5 }}
					onLongPress={() => console.log('onLongPress()')}
					onPress={() => console.log('onLongPress()')}
					pad={20}>
					<Avatar source={ImageUri} />
					<ListItem.Content>
						<ListItem.Title numberOfLines={1}>
							<Text style={{ color: '#6e6e6e' }}>{userInfo?.Name}</Text>
						</ListItem.Title>
					</ListItem.Content>
					<ListItem.CheckBox
						right={true}
						checked={userInfo?.isChecked}
						onPress={() => {
							handleCheckboxChange(userInfo.id);
						}}
					/>
				</ListItem>
			</View>
		);
	};

	const SelectedUserListText = React.useCallback(() => {
		const checkedNameList = checkedList.filter((user) => user.isChecked)?.map((user) => user?.Name);
		return checkedNameList?.map((name, index) => {
			return (
				<Text key={index} style={[styles.text, styles.selectBadge]}>
					{name}
				</Text>
			);
		});
	}, [checkedList]);

	return isLoading ? (
		<View style={LoadingStyle.modalBackground}>
			<View style={[LoadingStyle.loading_horizontal]}>
				<ActivityIndicator animating={isLoading} size={40} color="#3398ea" />
			</View>
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={MainStyles.container}>
				<InputField iconName="pencil" placeholder="Group Name" onChangeText={setGroupName} />
				<View style={styles.ToContainer}>
					<Text style={styles.text}>To: </Text>
					<SelectedUserListText />
				</View>
				<InputField
					iconName="search-web"
					placeholder="Search by Name"
					onChangeText={onSearchChange}
				/>
				<ScrollView>
					{filterUserList?.map((userInfo, index) => {
						return <CreateContactList key={index} {...userInfo} />;
					})}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	ToContainer: {
		marginBottom: 20,
		flexDirection: 'row',
		minHeight: 30,
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	text: {
		fontSize: 16,
		color: '#6e6e6e'
	},
	selectBadge: {
		color: '#FFF',
		backgroundColor: ThemeColor.PRIMARY,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 7,
		marginEnd: 5,
		marginBottom: 5
	}
});
