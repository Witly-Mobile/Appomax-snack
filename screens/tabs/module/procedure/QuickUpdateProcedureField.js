/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CheckboxField, FormCheckboxField } from '../../../../component/FormCheckboxField';
import { FormDateField } from '../../../../component/FormDateField';
import { FormFileBrowserField } from '../../../../component/FormFileBrowserField';
import { FormImagePickerField } from '../../../../component/FormImagePickerField';
import { FormInputField } from '../../../../component/FormInputField';
import { FormPickerField } from '../../../../component/FormPickerField';
import {
	HEADING,
	TEXT,
	NUMBER,
	CURRENCY,
	DATE,
	CHECKBOX,
	PICK_LIST,
	IMAGE,
	FILE,
	DECIMAL
} from '../../../../constants/FieldType';
import { PROCEDURE_FIELD_TYPE } from '../../../../constants/Globals';
import ThemeColor from '../../../../constants/ThemeColor';
import { ConvertStringToDateTime, FormatDateString } from '../../../../helper/DateUtils';
import MainStyle from '../../../../styles/MainStyle';
import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import { showMessage } from 'react-native-flash-message';
import { ConvertApiName } from '../../../../helper/StringUtils';

export const EditProcedureFieldComponent = ({ ...componentProps }) => {
	const { RestClientInstance, userData } = React.useContext(AuthContext);
	const { ExtId, procedureDetail } = componentProps;

	const ModuleInfo = React.useContext(ModuleContext);

	const OnUpdate = async (name, value, type) => {
		try {
			let query = new URLSearchParams({
				token: userData?.Token,
				id: ExtId,
				pcd_id: procedureDetail?.id
			});

			let newValue = value;
			if (DATE === type) {
				newValue = FormatDateString(value?.valuePicker, 'dd/MM/yyyy');
			}

			const jsonBody = {
				name: name,
				value: newValue
			};

			const url = `/${ConvertApiName(
				ModuleInfo.GetModuleInfoState().moduleName
			)}/procedure?${query.toString()}`;

			console.log('url', url);
			console.log('jsonBody', jsonBody);
			await RestClientInstance()
				.put(url, jsonBody)
				.then(
					(response) => {
						showMessage({
							message: 'update data successfully. ',
							duration: 1000,
							type: 'success'
						});
					},
					(reject) => {
						showMessage({
							message: 'Cannot update data. ' + reject,
							duration: 1000,
							type: 'danger'
						});
					}
				)
				.catch(function (error) {
					// handle error
					//console.info('Exception axios.get', error);
					showMessage({
						message: 'Cannot update data. ' + error,
						duration: 1000,
						type: 'danger'
					});
				})
				.finally(function () {
					// always executed
				});
		} catch (ex) {}
	};

	const FieldList = procedureDetail?.fields?.map((field, index) => {
		let fieldComponent;
		switch (field?.type) {
			case HEADING:
				fieldComponent = <Text>{field?.value}</Text>;
				break;
			case TEXT:
				fieldComponent = (
					<FormInputField
						name={field?.name}
						rules={{}}
						defaultValue={field?.value}
						onSubmitEditing={(event) => {
							OnUpdate(field?.name, event?.nativeEvent?.text, field?.type);
						}}
						placeholder="Enter Text"
					/>
				);
				break;
			case NUMBER:
				fieldComponent = (
					<FormInputField
						name={field?.name}
						rules={{}}
						defaultValue={field?.value}
						onSubmitEditing={(event) => {
							OnUpdate(field?.name, event?.nativeEvent?.text, field?.type);
						}}
						placeholder="Enter Number"
					/>
				);
				break;

			case CURRENCY:
				fieldComponent = (
					<FormInputField
						name={field?.name}
						rules={{}}
						defaultValue={field?.value}
						onSubmitEditing={(event) => {
							OnUpdate(field?.name, event?.nativeEvent?.text, field?.type);
						}}
						placeholder="Enter Currency"
					/>
				);
				break;
			case DATE:
				fieldComponent = (
					<FormDateField
						name={field?.name}
						rules={{}}
						defaultValue={{
							showPicker: false,
							valuePicker: ConvertStringToDateTime(field?.value)
						}}
						OnRealTimeChange={(value) => OnUpdate(field?.name, value, field?.type)}
					/>
				);
				break;
			case CHECKBOX:
				fieldComponent = (
					<FormCheckboxField
						name={field?.name}
						rules={{}}
						defaultValue={false}
						OnRealTimeChange={(value) => OnUpdate(field?.name, value, field?.type)}
					/>
				);
				break;
			case PICK_LIST:
				let listOptions = [];

				if (field?.listOptions?.length > 0) {
					listOptions = field?.listOptions;
				}
				//add default choice
				if (!listOptions.find((option) => option?.label === '-- Select --')) {
					listOptions.unshift({ label: '-- Select --', value: '0' });
				}
				console.log('field?.value', field?.value);
				fieldComponent = (
					<FormPickerField
						name={field?.name}
						rules={{}}
						defaultValue={field?.value}
						choices={listOptions}
						OnRealTimeChange={(value) => {
							const selectItem = listOptions.find((item) => item.value === value);
							OnUpdate(field?.name, selectItem?.value, field?.type);
						}}
					/>
				);
				break;
			case IMAGE:
				fieldComponent = (
					<FormImagePickerField
						name={field?.name}
						rules={{}}
						defaultValue={field?.value}
						OnRealTimeChange={(value) => console.log(value)}
					/>
				);
				break;
			case FILE:
				fieldComponent = (
					<FormFileBrowserField name={field?.name} rules={{}} defaultValue={field?.value} />
				);
				break;
			case DECIMAL:
				fieldComponent = (
					<FormInputField
						name={field?.name}
						rules={{}}
						defaultValue={field?.value}
						onSubmitEditing={(event) => {
							OnUpdate(field?.name, event?.nativeEvent?.text, field?.type);
						}}
					/>
				);
				break;
			default:
				fieldComponent = <Text>{field?.name}</Text>;
				break;
		}
		return field?.type !== 0 ? (
			<Card key={index} containerStyle={{ borderColor: ThemeColor.BORDER, borderRadius: 5 }}>
				<View key={index} style={MainStyle.fieldView}>
					<Text style={MainStyle.fieldName}>{field?.name}</Text>
					{fieldComponent}
				</View>
			</Card>
		) : (
			<Text key={index} style={MainStyle.fieldName}>
				{field?.value}
			</Text>
		);
	});

	return (
		<View>
			<Card containerStyle={{ borderRadius: 10 }} wrapperStyle={{}}>
				<Card.FeaturedTitle h4 h4Style={{ color: ThemeColor.PRIMARY }}>
					{procedureDetail?.name}
				</Card.FeaturedTitle>
				{FieldList}
			</Card>
		</View>
	);
};
