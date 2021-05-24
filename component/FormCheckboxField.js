import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { CheckBox } from 'react-native-elements';
import ThemeColor from '../constants/ThemeColor';
import CheckBoxStyle from './../styles/component/CheckboxStyle';

export const FormCheckboxField = (props) => {
	const {
		name,
		rules,
		defaultValue = '',
		OnRealTimeChange = (value) => {},
		...checkboxProps
	} = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });

	return (
		<CheckboxField
			{...checkboxProps}
			error={errors[name]?.message}
			onValueChange={(value) => {
				field.onChange(value);
				OnRealTimeChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
			title={field.name}
		/>
	);
};

export const CheckboxField = ({ error, onValueChange, onBlur, ...checkboxProps }) => {
	const { title, value } = checkboxProps;

	return (
		<CheckBox
			title={title}
			checkedColor={ThemeColor.PRIMARY}
			size={30}
			checked={value}
			containerStyle={CheckBoxStyle.container}
			textStyle={CheckBoxStyle.text}
			onIconPress={() => {
				onValueChange(!value);
			}}
			onPress={() => {
				onValueChange(!value);
			}}
		/>
	);
};
