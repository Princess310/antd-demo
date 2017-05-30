
import { fromJS } from 'immutable';
import feedBackPageReducer from '../reducer';

describe('feedBackPageReducer', () => {
  it('returns the initial state', () => {
    expect(feedBackPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
