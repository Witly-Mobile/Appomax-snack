import { types } from 'mobx-state-tree';

export const DescribeField = types.model('Relation', {
  Name: types.string,
  Type: types.string,
});
