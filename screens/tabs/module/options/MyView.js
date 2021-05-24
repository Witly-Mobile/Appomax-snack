import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, Badge, ListItem } from 'react-native-elements';
import GlobalStyle from '../../../../styles/GlobalStyle';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import { Pressable } from 'react-native';

const MyView = ({ navigation, route }) => {
	const ModuleInfoContext = React.useContext(ModuleContext);

	const list = Array.from(ModuleInfoContext?.view).map((view) => {
		return {
			id: view.id,
			title: view.Name,
		};
	});

	return (
		<ScrollView>
			<View style={GlobalStyle.container}>
				{list.map((item, i) => (
					<Pressable key={i} onLongPress={() => console.log('Looooooooooooooooooooooooong press')}>
						<ListItem bottomDivider>
							<Icon name={item.icon} />
							<ListItem.Content>
								<ListItem.Title>{item.title}</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
};

export default MyView;
