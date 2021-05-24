import * as React from 'react';
import { View, Text } from 'react-native';
import { DateTimeOptions } from '../constants/Globals';
import BaseStyle from './../styles/component/BaseStyle';

export function ViewDateTime(props) {
	let date = new Date(props?.TextValue);
	//console.log(new Intl.DateTimeFormat('default', DateTimeOptions).format(date));

	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{props?.FieldName}</Text>
			<Text style={{ fontSize: 16 }}>{props.TextValue}</Text>
		</View>
	);
}
