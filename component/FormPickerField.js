/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export const FormPickerField = (props) => {
	const {
		name,
		rules,
		defaultValue = '',
		OnRealTimeChange = (value) => {},
		...pickerProps
	} = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });
	return (
		<PickerField
			{...pickerProps}
			error={errors[name]?.message}
			onValueChange={(value) => {
				field.onChange(value);
				OnRealTimeChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
		/>
	);
};

/* export const OldPickerField = ({ error, onValueChange, onBlur, ...pickerProps }) => {
	const { choices } = pickerProps;
	let selectedValue = pickerProps?.value;
	//console.log(selectedValue);
	//console.log('[PickerField] choices ', choices);
	let selectItems = choices
		? choices.map(({ label, value }, index) => {
				let latestValue = '';
				if (typeof value === 'object') {
					if (value['Display As'] === 'None') {
						latestValue = label;
					} else if (value['Display As'] === 'Icon') {
						latestValue = label;
					} else if (value['Display As'] === 'Color') {
						latestValue = label;
					} else {
						latestValue = label;
					}
				} else {
					latestValue = value;
				}

				return <Picker.Item key={index} value={latestValue} label={label} />;
		  })
		: [];

	if (!isNaN(selectedValue)) {
		selectedValue = selectedValue.toString();
	}

	return (
		<View style={{ borderWidth: 1, borderColor: '#b5b5b5', borderRadius: 4, paddingHorizontal: 8 }}>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(value) => {
					onValueChange(value);
				}}
				style={{ height: 50 }}>
				{selectItems}
			</Picker>
		</View>
	);
}; */

export const PickerField = ({ error, onValueChange, onBlur, ...pickerProps }) => {
	const { choices } = pickerProps;
	let selectedValue = pickerProps?.value;

	let newChoices = choices
		? choices.map(({ label, value }, index) => {
				let latestValue = '';
				if (typeof value === 'object') {
					if (value['Display As'] === 'None') {
						latestValue = label;
					} else if (value['Display As'] === 'Icon') {
						latestValue = label;
					} else if (value['Display As'] === 'Color') {
						latestValue = label;
					} else {
						latestValue = label;
					}
				} else {
					latestValue = value;
				}

				return { label: label, value: latestValue };
		  })
		: [];

	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: '#b5b5b5',
				borderRadius: 4,
				paddingHorizontal: 8,
				height: 50,
				justifyContent: 'center'
			}}>
			<RNPickerSelect
				value={selectedValue}
				onValueChange={(value) => {
					onValueChange(value);
				}}
				style={pickerSelectStyles}
				items={newChoices}
			/>
		</View>
	);
};

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 20,
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 20,
		paddingHorizontal: 10,
		paddingVertical: 8,
		color: 'black',
		height: 50,
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});
