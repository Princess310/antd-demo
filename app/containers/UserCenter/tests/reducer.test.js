
import { fromJS } from 'immutable';
import userCenterReducer from '../reducer';

describe('userCenterReducer', () => {
  it('returns the initial state', () => {
    expect(userCenterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
