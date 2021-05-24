import { types } from 'mobx-state-tree';

export const User = types.model('User', {
  id: types.identifier,
  Username: types.string,
  Fullname: types.string,
  Email: types.string,
  LandingUrl: types.string,
  ProfileUrl: types.string,
  ProfileImageUrl: types.string,
  Token: types.string,
  TokenExpiryDate: types.string,
  ThemeColorCode: types.string,
});
