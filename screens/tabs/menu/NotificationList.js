/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { ActivityIndicator } from 'react-native';

import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
	Image,
	Text,
	FlatList,
	ScrollView,
	SafeAreaView
} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import InteractivePressable from '../../../component/InteractivePressable';
import { BASE_URL } from '../../../constants/Globals';
import AuthContext from '../../../context/AuthContext';

export default function NotificationList({ navigation, route }) {
	const ITEM_PER_PAGE = 15;
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const [notificationsList, SetNotificationsList] = React.useState([]);
	const [notificationData, SetNotificationData] = React.useState({});
	const [page, SetPage] = React.useState(1);
	const [isLoading, setIsLoading] = React.useState(true);
	const [isLoadMore, SetIsLoadMore] = React.useState(false);
	const [hasScrolled, SetHasScrolled] = React.useState(false);

	React.useEffect(() => {
		async function fetchInitialData(pageNo, itemPerPage) {
			let query = new URLSearchParams({
				token: userData?.Token,
				current: pageNo,
				per: itemPerPage
			});
			const url = BASE_URL + 'notification-list?' + query.toString();
			await RestClientInstance()
				.get(url)
				.then((response) => {
					SetNotificationsList(response?.data?.notification);
				})
				.catch((error) => {})
				.finally(() => {});
		}
		SetNotificationsList([]);
		fetchInitialData(page, ITEM_PER_PAGE);
		return () => {
			//console.log('clean notification list');
			SetNotificationsList([]);
		};
	}, []);

	//console.log('================[First renderItem]=====================', notificationsList?.length);
	const renderItem = (itemData) => {
		const { index, item, separators } = itemData;
		return (
			<ListItem
				containerStyle={{}}
				disabledStyle={{ opacity: 0.5 }}
				onLongPress={() => console.log('onLongPress()')}
				onPress={() => console.log('onPress()')}
				pad={20}>
				<ListItem.Content>
					<ListItem.Title>
						<Text>{item?.Message}</Text>
					</ListItem.Title>
					<ListItem.Subtitle>
						<Text>{item?.UpdateDesc}</Text>
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		);
	};

	const onScroll = () => {
		SetHasScrolled(true);
	};

	const handleLoadMore = async (info) => {
		if (!hasScrolled) {
			return null;
		}

		//Load more item
		SetIsLoadMore(true);
		let nextPage = page + 1;

		let query = new URLSearchParams({
			token: userData?.Token,
			current: nextPage,
			per: ITEM_PER_PAGE
		});
		const url = BASE_URL + 'notification-list?' + query.toString();
		await RestClientInstance()
			.get(url)
			.then((response) => {
				//console.log('Load more url', url, response?.data);
				let extendedNoti = notificationsList.concat(response?.data?.notification);
				SetNotificationsList(extendedNoti);
				SetPage(nextPage);
			})
			.catch((error) => {})
			.finally(() => {
				SetIsLoadMore(false);
			});
	};

	return (
		<SafeAreaView>
			<Card containerStyle={{}} wrapperStyle={{}}>
				<FlatList
					onScroll={onScroll}
					data={notificationsList}
					renderItem={renderItem}
					keyExtractor={(item) => item.Id}
					getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
					onEndReachedThreshold={0.05}
					onEndReached={handleLoadMore}
					ListFooterComponent={() => (
						<ActivityIndicator animating={isLoadMore} size={40} color="#3398ea" />
					)}
				/>
			</Card>
		</SafeAreaView>
	);
}
