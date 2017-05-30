
import { fromJS } from 'immutable';
import userSettingPageReducer from '../reducer';

describe('userSettingPageReducer', () => {
  it('returns the initial state', () => {
    expect(userSettingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
