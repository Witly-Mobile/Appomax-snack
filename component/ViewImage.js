import { isObject } from 'lodash';
import * as React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import {
	BuildImageSource,
	IsEmptyOrNullOrUndefined,
	isObjectEmpty,
	validURI
} from '../helper/StringUtils';
import BaseStyle from './../styles/component/BaseStyle';

export function ViewImage(fieldProps) {
	const { ImageData, FieldName } = fieldProps;
	//console.log('[ViewImage] ImageData', ImageData);

	const imageSource = BuildImageSource(
		ImageData === null
			? ''
			: IsEmptyOrNullOrUndefined(ImageData?.Url)
			? IsEmptyOrNullOrUndefined(ImageData['Image Url'])
				? ''
				: ImageData['Image Url']
			: ImageData?.Url
	);

	//console.log(imageSource);
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{FieldName}</Text>
			{isObjectEmpty(imageSource) ? (
				<View />
			) : (
				<Image
					onPress={() => {}}
					style={{ height: 200, width: 200 }}
					resizeMode="contain"
					source={imageSource}
					PlaceholderContent={<ActivityIndicator />}
				/>
			)}
		</View>
	);
}
