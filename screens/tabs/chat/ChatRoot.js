import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GiftedChat } from 'react-native-gifted-chat';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import InteractivePressable from '../../../component/InteractivePressable';

import ChatMessage from './ChatMessage';
import ChatHome from './ChatHome';
import NewChat from './NewChat';

const ChatStack = createStackNavigator();

export default function ChatRoot({ navigation, route }) {
	return (
		<ChatStack.Navigator
			initialRouteName="ChatHome"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#3398ea'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}>
			<ChatStack.Screen
				name="ChatHome"
				component={ChatHome}
				options={{
					headerTitle: 'Message'
				}}
			/>
			<ChatStack.Screen
				name="ChatMessage"
				component={ChatMessage}
				options={{
					headerTitle: 'Message',
					headerRight: () => {}
				}}
			/>
			<ChatStack.Screen
				name="NewChat"
				component={NewChat}
				options={{
					headerTitle: 'New conversation',
					headerRight: () => {}
				}}
			/>
		</ChatStack.Navigator>
	);
}
