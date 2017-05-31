/*
 *
 * UserCenter reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_INDUSTRY,
  LOAD_SERVICE,
  LOAD_BUSINESS_INFO,
  LAOD_CITY_INFO,
} from './constants';

const initialState = fromJS({
  industry: false,
  service: false,
  business: false,
  city: false,
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
    case LOAD_BUSINESS_INFO: {
      const { data } = action.payload;

      return state.set('business', data);
    }
    case LAOD_CITY_INFO: {
      const { data } = action.payload;

      return state.set('city', data);
    }
    default:
      return state;
  }
}

export default userCenterReducer;
