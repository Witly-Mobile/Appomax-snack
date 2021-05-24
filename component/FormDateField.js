import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Pressable, StyleSheet } from 'react-native';
import ThemeColor from '../constants/ThemeColor';
import { FormatDateString } from '../helper/DateUtils';
import AuthContext from '../context/AuthContext';

export const FormDateField = (props) => {
	const { profile } = React.useContext(AuthContext);
	const { name, rules, defaultValue = '', OnRealTimeChange = (value) => {}, ...dateProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });

	return (
		<DatePickerField
			{...dateProps}
			error={errors[name]?.message}
			onValueChange={(value) => {
				field.onChange(value);

				if (field.value?.valuePicker !== value?.valuePicker) {
					OnRealTimeChange(value);
				}
			}}
			onBlur={field.onBlur}
			value={field.value} // {showPicker: '', valuePicker: ''}
		/>
	);
};

export const DatePickerField = ({ error, onValueChange, onBlur, ...dateProps }) => {
	const { value } = dateProps;

	const onPickerChange = (changedValue) => {
		if (changedValue?.type === 'set' && changedValue?.nativeEvent?.timestamp) {
			onValueChange({
				showPicker: false,
				valuePicker: new Date(changedValue?.nativeEvent?.timestamp)
			});
		}
	};

	const dateStr = FormatDateString(value?.valuePicker, 'dd/MM/yyyy');

	return (
		<Pressable
			onPress={() => {
				onValueChange({ showPicker: true, valuePicker: value.valuePicker });
			}}
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
				},
				styles.dateWrapper
			]}>
			<Text>{dateStr}</Text>
			<Icon name="calendar" size={30} color="#6e6e6e" />
			{value.showPicker && (
				<DateTimePicker
					testID="datePicker"
					value={value.valuePicker}
					mode={'date'}
					is24Hour={true}
					display="default"
					onChange={onPickerChange}
				/>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	dateWrapper: {
		flexDirection: 'row',
		borderRadius: 4,
		padding: 6,
		borderWidth: 1,
		borderColor: '#b5b5b5',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between'
	}
});
