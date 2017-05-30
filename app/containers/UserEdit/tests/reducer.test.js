
import { fromJS } from 'immutable';
import userEditReducer from '../reducer';

describe('userEditReducer', () => {
  it('returns the initial state', () => {
    expect(userEditReducer(undefined, {})).toEqual(fromJS({}));
  });
});
