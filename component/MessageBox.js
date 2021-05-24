import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { SUCCESS_UPDATE, ERROR_UPDATE } from '../constants/Globals';
import MessageBoxStyle from './../styles/component/MessageBoxStyle';
import ModuleContext from './../context/ModuleContext';

export function DoneMessageBox({ message, SetStatusBadge }) {
	const ModuleInfo = React.useContext(ModuleContext);

	return (
		<View style={[MessageBoxStyle.msgBox, MessageBoxStyle.successMsgBox]}>
			<Icon name="check" size={30} color="#75b82a" style={{ marginEnd: 10 }} />
			<Text style={{ fontSize: 16 }}>{message}</Text>
			<TouchableOpacity
				onPress={() => {
					ModuleInfo.SetActionResult({});
					SetStatusBadge();
				}}>
				<Icon name="close" size={20} color="#b5b5b5" style={{ marginStart: 5 }} />
			</TouchableOpacity>
		</View>
	);
}

export function ErrorMessageBox({ message, SetStatusBadge }) {
	const ModuleInfo = React.useContext(ModuleContext);
	return (
		<View style={[MessageBoxStyle.msgBox, MessageBoxStyle.errorMsgBox]}>
			<Icon name="alert-circle" size={30} color="#a6221b" style={{ marginEnd: 10 }} />
			<Text style={{ fontSize: 16 }}>{message}</Text>
			<TouchableOpacity
				onPress={() => {
					ModuleInfo.SetActionResult({});
					SetStatusBadge();
				}}>
				<Icon name="close" size={20} color="#b5b5b5" style={{ marginStart: 5 }} />
			</TouchableOpacity>
		</View>
	);
}
