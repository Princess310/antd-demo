/*
 *
 * UserCenter reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_INDUSTRY,
  LOAD_SERVICE,
} from './constants';

const initialState = fromJS({
  industry: false,
  service: false,
});

function userCenterReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_INDUSTRY: {
      const { list } = action.payload;

      return state.set('industry', list);
    }
    case LOAD_SERVICE: {
      const { list } = action.payload;

      return state.set('service', list);
    }
    default:
      return state;
  }
}

export default userCenterReducer;
