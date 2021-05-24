import * as React from 'react';
import { View } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Pressable, StyleSheet } from 'react-native';
import ThemeColor from '../constants/ThemeColor';
import { FormatDateString, FormatTimeString } from '../helper/DateUtils';
import AuthContext from '../context/AuthContext';

export const FormDateTimeField = (props) => {
	const { profile } = React.useContext(AuthContext);
	const { name, rules, defaultValue = '', ...dateTimeProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });

	return (
		<DateTimePickerField
			{...dateTimeProps}
			error={errors[name]?.message}
			onValueChange={(value) => {
				field.onChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value} // {showPicker: '', valuePicker: ''}
		/>
	);
};

export const DateTimePickerField = ({ error, onValueChange, onBlur, ...dateTimeProps }) => {
	const { value } = dateTimeProps;

	const onPickerChange = (changedValue) => {
		if (changedValue?.type === 'set' && changedValue?.nativeEvent?.timestamp) {
			onValueChange({
				showPicker: false,
				valuePicker: new Date(changedValue?.nativeEvent?.timestamp)
			});
		}
	};

	const dateStr = FormatDateString(value?.valuePicker, 'dd/MM/yyyy');
	const timeStr = FormatTimeString(value?.valuePicker, 'hh:mm');

	return (
		<View>
			<Pressable
				onPress={() => {
					onValueChange({
						showDatePicker: true,
						showTimePicker: false,
						valuePicker: value.valuePicker
					});
				}}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
					},
					styles.dateTimeWrapper
				]}>
				<Text style={styles.dateText}>{`${dateStr}`}</Text>
				<Icon name="calendar" size={30} color="#6e6e6e" />
				{value?.showDatePicker && (
					<DateTimePicker
						testID="dateTimePicker_date"
						value={value.valuePicker}
						mode={'date'}
						is24Hour={true}
						display="default"
						onChange={onPickerChange}
					/>
				)}
			</Pressable>
			<Pressable
				onPress={() => {
					onValueChange({
						showDatePicker: false,
						showTimePicker: true,
						valuePicker: value.valuePicker
					});
				}}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
					},
					styles.dateTimeWrapper
				]}>
				<Text style={styles.dateText}>{`${timeStr}`}</Text>
				<Icon name="clock-outline" size={30} color="#6e6e6e" />
				{value?.showTimePicker && (
					<DateTimePicker
						testID="dateTimePicker_time"
						value={value.valuePicker}
						mode={'time'}
						is24Hour={true}
						display="default"
						onChange={onPickerChange}
					/>
				)}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	dateTimeWrapper: {
		flexDirection: 'row',
		borderRadius: 4,
		paddingVertical: 6,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: '#b5b5b5',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	dateText: {
		fontSize: 16
	}
});
