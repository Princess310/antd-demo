/*
 *
 * BusinessPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MOMENT_DETAIL,
} from './constants';

const initialState = fromJS({
  detail: false,
});

function businessPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MOMENT_DETAIL: {
      const { data } = action.payload;

      return state.set('detail', data);
    }
    default:
      return state;
  }
}

export default businessPageReducer;
