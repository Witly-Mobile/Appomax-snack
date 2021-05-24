import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FormatDateTimeString } from '../helper/DateUtils';
import { ValidTimestampFormat } from '../helper/StringUtils';
import BaseStyle from '../styles/component/BaseStyle';

export function ViewQRCode(props) {
	let textValue = props?.TextValue;

	if (ValidTimestampFormat(textValue)) {
		//timestamp length in second, millisecond
		textValue = FormatDateTimeString(props?.TextValue);
	}
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{props?.FieldName}</Text>
			<Text style={{ fontSize: 16, marginBottom: 10 }}>{textValue}</Text>
			{/* <QRCode value={textValue} size={100} bgColor="black" fgColor="white" /> */}
			<QRCode
				//QR code value
				value={textValue}
				//size of QR Code
				size={120}
				//Color of the QR Code (Optional)
				color="black"
				//Background Color of the QR Code (Optional)
				backgroundColor="white"
			/>
		</View>
	);
}
