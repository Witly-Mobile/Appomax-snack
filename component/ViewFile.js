import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { validURI } from '../helper/StringUtils';
import BaseStyle from './../styles/component/BaseStyle';

export function ViewFile(fieldProps) {
	const { FileData, FieldName } = fieldProps;
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{FieldName}</Text>
			{FileData ? (
				<TouchableOpacity
					onPress={() => {
						alert(FileData.Url);
					}}>
					<Text style={{ fontSize: 16, color: '#0000EE', textDecorationLine: 'underline' }}>
						{FileData.Name}
					</Text>
				</TouchableOpacity>
			) : (
				<></>
			)}
		</View>
	);
}
