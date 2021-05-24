import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BaseStyle from './../styles/component/BaseStyle';
import { DateTimeOptions } from '../constants/Globals';
import { FormatDateTimeString } from '../helper/DateUtils';
import { GetContrast } from '../helper/ColorUtils';
import { BuildImageSource, ValidTimestampFormat } from '../helper/StringUtils';

export function ViewText(props) {
	let textValue = props?.TextValue;

	if (ValidTimestampFormat(textValue)) {
		//timestamp length in second, millisecond
		textValue = FormatDateTimeString(props?.TextValue);
	}
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{props?.FieldName}</Text>
			<Text style={{ fontSize: 16 }}>{textValue}</Text>
		</View>
	);
}

export function ViewTextBadge(props) {
	let textValue = props?.TextValue;
	if (ValidTimestampFormat(textValue)) {
		textValue = FormatDateTimeString(props?.TextValue);
	}
	const TextBadgeComponent = TextBadge(props?.FieldInfo, textValue, props?.keyIndex);
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{props?.FieldName}</Text>
			{TextBadgeComponent}
		</View>
	);
}

export function TextBadge(FieldInfo, textValue, keyIndex) {
	if (FieldInfo?.Type === 'Picklist') {
		const listItem = FieldInfo['List Value'];
		const selectedItem = listItem?.find((item) => item.Name === textValue);
		if (selectedItem && selectedItem['Display As'] === 'Color') {
			const color = selectedItem.Value?.Color;
			return (
				<View style={styles.bodyBadge(color)} key={keyIndex}>
					<Text style={styles.textBadge(color)}>{textValue}</Text>
				</View>
			);
		} else if (selectedItem && selectedItem['Display As'] === 'Icon') {
			const ImageData = selectedItem?.Value;
			const imageSource = BuildImageSource(ImageData['Image Url']);
			return (
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						source={imageSource}
						resizeMode="contain"
						style={{ height: 30, width: 30, marginEnd: 10 }}
					/>
					<Text>{textValue}</Text>
				</View>
			);
		} else {
			return <Text>{textValue}</Text>;
		}
	} else {
		return <Text>{textValue}</Text>;
	}
}

const styles = StyleSheet.create({
	bodyBadge: (bkColor) => ({
		alignSelf: 'flex-start',
		backgroundColor: bkColor,
		borderRadius: 20
	}),
	textBadge: (bkColor) => ({
		color: GetContrast(bkColor),
		marginVertical: 5,
		marginHorizontal: 20
	})
});
