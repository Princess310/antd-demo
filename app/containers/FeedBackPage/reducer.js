/*
 *
 * FeedBackPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
} from './constants';

const initialState = fromJS({});

function feedBackPageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default feedBackPageReducer;
