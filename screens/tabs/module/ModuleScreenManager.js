/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { FormAutoLookupField } from '../../../component/FormAutoLookupField';
import { FormCheckboxField } from '../../../component/FormCheckboxField';
import { FormDateField } from '../../../component/FormDateField';
import { FormDateTimeField } from '../../../component/FormDateTimeField';
import { FormFileBrowserField } from '../../../component/FormFileBrowserField';
import { FormImagePickerField } from '../../../component/FormImagePickerField';
import { FormInputField } from '../../../component/FormInputField';
import { FormPickerField } from '../../../component/FormPickerField';
import { GetContrast } from '../../../helper/ColorUtils';
import { ConvertStringToDateTime } from '../../../helper/DateUtils';
import { CompareString, isObjectEmpty } from '../../../helper/StringUtils';

import BtnStyle from '../../../styles/component/ButtonStyle';
import MainStyles from '../../../styles/MainStyle';

export function SubmitContainer(submitProps) {
	const { rightBtnTitle, rightBtnAction, leftBtnTitle, leftBtnAction } = submitProps;

	return (
		<View style={{ flexDirection: 'row' }}>
			<Button
				title={leftBtnTitle && 'Back'}
				onPress={leftBtnAction}
				type="solid"
				titleStyle={BtnStyle.title}
				buttonStyle={BtnStyle.button}
				containerStyle={BtnStyle.container}
			/>
			<Button
				title={rightBtnTitle && 'Save'}
				onPress={rightBtnAction}
				type="solid"
				titleStyle={BtnStyle.title}
				buttonStyle={BtnStyle.button}
				containerStyle={BtnStyle.container}
			/>
		</View>
	);
}

export function FieldCreator({ Name, Value, IndexKey, FieldInfo }) {
	const { Type, Required } = FieldInfo;
	let inputField = null;
	const requiredRule = Required === 'true' ? { required: 'Input is required!' } : {};
	if (
		[
			'Text',
			'TextArea',
			'Text Editor',
			'Number',
			'AutoNumber',
			'TinyNumber',
			'Decimal',
			'Currency',
			'Email',
			'URL'
		].includes(Type)
	) {
		inputField = <FormInputField name={Name} rules={requiredRule} defaultValue={Value} />;
	} else if (['Lookup'].includes(Type)) {
		inputField = <FormAutoLookupField name={Name} rules={requiredRule} defaultValue={Value} />;
	} else if (['Picklist'].includes(Type)) {
		const listOptions = Array.from(FieldInfo['List Value']).flatMap((option) => {
			if (typeof option === 'object') {
				return { label: option?.Name, value: option };
			} else {
				return { label: option, value: option };
			}
		});
		//add default choice
		listOptions.unshift({ label: '-- Select --', value: '0' });

		inputField = (
			<FormPickerField name={Name} rules={null} defaultValue={Value} choices={listOptions} />
		);
	} else if (['DateTime'].includes(Type)) {
		inputField = (
			<FormDateTimeField
				name={Name}
				rules={requiredRule}
				defaultValue={{
					showDatePicker: false,
					showTimePicker: false,
					valuePicker: ConvertStringToDateTime(Value)
				}}
			/>
		);
	} else if (['Date'].includes(Type)) {
		inputField = (
			<FormDateField
				name={Name}
				rules={requiredRule}
				defaultValue={{
					showPicker: false,
					valuePicker: ConvertStringToDateTime(Value)
				}}
			/>
		);
	} else if (['Checkbox'].includes(Type)) {
		inputField = <FormCheckboxField name={Name} rules={requiredRule} defaultValue={Value} />;
	} else if (['File'].includes(Type)) {
		inputField = <FormFileBrowserField name={Name} rules={requiredRule} defaultValue={Value} />;
	} else if (['Image'].includes(Type)) {
		inputField = <FormImagePickerField name={Name} rules={requiredRule} defaultValue={Value} />;
	}

	const fieldName = `${Name} ${isObjectEmpty(requiredRule) ? '' : '*'}`;
	//console.log('Hey >>>>>> ', isObjectEmpty(requiredRule));
	return (
		<View key={IndexKey} style={MainStyles.fieldView}>
			<Text style={[MainStyles.fieldName, isObjectEmpty(requiredRule) ? {} : { color: 'red' }]}>
				{fieldName}
			</Text>
			{inputField}
		</View>
	);
}

export function ValidateSubmitFormData(formData, moduleDescribe) {
	if (!moduleDescribe) {
		return {};
	}
	const dateDescribeList = moduleDescribe.Fields.filter((field) =>
		['Date', 'DateTime'].includes(field.Type)
	);

	//console.log('', Object.entries(formData));
	const validated = Object.fromEntries(
		Object.entries(formData).map(([keyName, value], index) => {
			//console.log(keyName, value);
			let newValue;
			if (dateDescribeList?.find((info) => [info?.Name, info?.VariableName].includes(keyName))) {
				newValue = value.valuePicker;
			} else {
				newValue = value;
			}
			return [keyName, newValue];
		})
	);
	return validated;
}

export function FindFirstPageLayoutByType(pageLayoutList, layoutType) {
	return pageLayoutList.find((layout) => {
		return (
			layout['Page Type'] === layoutType &&
			layout[Object.keys(layout).find((l, index) => CompareString(l, 'First Page') === 0)] === true
		);
	});
}

export function FindFirstPageLayoutById(pageLayoutList, layoutId) {
	return pageLayoutList.find((layout) => layout?.id === layoutId);
}

export function CreateBottomSheetOptions(
	action,
	iconName,
	nextPage,
	actionBefore,
	needDialog = false,
	dialogMessages = { title: '', body: '', yes: '', no: '' }
) {
	return {
		title: action.Name,
		icon: iconName,
		Location: action.Location,
		nextPage: nextPage,
		ActionBeforeNext: actionBefore,
		needDialog: needDialog,
		dialogMessages: dialogMessages
	};
}
