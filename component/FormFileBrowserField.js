/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ThemeColor from '../constants/ThemeColor';
import * as DocumentPicker from 'expo-document-picker';
import { IsEmptyOrNullOrUndefined, isObjectEmpty } from '../helper/StringUtils';

export const FormFileBrowserField = (props) => {
	const {
		name,
		rules,
		defaultValue = '',
		OnRealTimeChange = (value) => {},
		...fileBrowseProps
	} = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });
	return (
		<FileBrowser
			{...fileBrowseProps}
			onValueChange={(value) => {
				field.onChange(value);
				OnRealTimeChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
		/>
	);
};

/* Response
{
  "name": "GoogleSearchGuide-back.pdf",
  "size": 487145,
  "type": "success",
  "uri": "content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FGoogleSearchGuide-back.pdf",
} */
export const FileBrowser = ({ error, onValueChange, onBlur, ...fileBrowseProps }) => {
	const [fileData, setFileData] = React.useState(fileBrowseProps?.value);
	const [file, setFile] = React.useState(null);

	//console.log(fileData, IsEmptyOrNullOrUndefined(fileData));
	return (
		<View
			style={{
				paddingHorizontal: 16,
				paddingVertical: 10,
				borderRadius: 4,
				borderColor: '#cecece',
				borderWidth: 1
			}}>
			{isObjectEmpty(fileData) ? (
				<Pressable
					style={({ pressed }) => [
						{
							backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
						},
						styles.fileInput
					]}
					onPress={() => {
						DocumentPicker.getDocumentAsync({
							type: '*/*',
							copyToCacheDirectory: false,
							multiple: false
						})
							.then((response) => {
								//console.log('Got  a file', response);
								if (response?.type !== 'cancel') {
									setFileData({ Name: response?.name, Url: response?.uri });
								}
							})
							.catch(() => {})
							.finally(() => {});
					}}>
					<Icon name="file-upload-outline" size={30} color="#6e6e6e" style={{ marginEnd: 20 }} />
					<Text style={{ color: '#6e6e6e' }}>Browse a file</Text>
				</Pressable>
			) : (
				<View
					style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text>{fileData?.Name}</Text>
					<Pressable onPress={() => setFileData({})}>
						<Icon name="close-circle" size={30} color="red" />
					</Pressable>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	fileInput: {
		flexDirection: 'row',
		padding: 6,
		height: 50,
		alignItems: 'center'
	}
});
