import { types } from 'mobx-state-tree';

export const DescribeField = types.model('Field', {
	Name: types.string,
	VariableName: types.string,
	Type: types.string,
	Length: types.number,
	Updatable: types.string,
	Required: types.string,
	Unique: types.string,
	'Default Value': types.string
});
