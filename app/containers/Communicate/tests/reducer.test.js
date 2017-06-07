
import { fromJS } from 'immutable';
import communicateReducer from '../reducer';

describe('communicateReducer', () => {
  it('returns the initial state', () => {
    expect(communicateReducer(undefined, {})).toEqual(fromJS({}));
  });
});
