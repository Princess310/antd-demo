
import { fromJS } from 'immutable';
import resetMobileReducer from '../reducer';

describe('resetMobileReducer', () => {
  it('returns the initial state', () => {
    expect(resetMobileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
