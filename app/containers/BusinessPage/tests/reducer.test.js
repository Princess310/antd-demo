
import { fromJS } from 'immutable';
import businessPageReducer from '../reducer';

describe('businessPageReducer', () => {
  it('returns the initial state', () => {
    expect(businessPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
