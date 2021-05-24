import * as React from 'react';
import { View, Text } from 'react-native';
import { DateTimeOptions } from '../constants/Globals';
import BaseStyle from './../styles/component/BaseStyle';

export function ViewDate(props) {
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{props?.FieldName}</Text>
			<Text style={{ fontSize: 16 }}>{props.TextValue}</Text>
		</View>
	);
}
