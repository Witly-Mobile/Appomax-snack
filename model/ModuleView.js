import { types } from 'mobx-state-tree';

export const ModuleView = types.model('ModuleViewModel', {
  id: types.identifier,
  Name: types.optional(types.string, ''),
  'Report Type': types.optional(types.string, ''),
  Description: types.optional(types.string, ''),
});
