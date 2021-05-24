import { types } from 'mobx-state-tree';

export const Describe = types.model('Describe', {
	Name: types.optional(types.string, ''),
	'API Name': types.optional(types.string, ''),
	Type: types.optional(types.string, ''),
	accessible: types.optional(types.string, ''),
	creatable: types.optional(types.string, ''),
	editable: types.optional(types.string, ''),
	deletable: types.optional(types.string, ''),
	'Icon Url': types.optional(types.string, ''),
	Url: types.optional(types.string, ''),
	'Key Field': types.optional(types.string, '')
	//Fields: types.optional(types.array(Field), []),
	//Relation: types.optional(types.array(Relation), []),
});
