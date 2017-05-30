
import { fromJS } from 'immutable';
import userBlackListReducer from '../reducer';

describe('userBlackListReducer', () => {
  it('returns the initial state', () => {
    expect(userBlackListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
