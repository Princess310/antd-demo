/*
 *
 * BusinessPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MOMENT_DETAIL,

  LOAD_BUSINESS,
  LOAD_BUSINESS_REFRESH,
  LOAD_BUSINESS_LOADING,

  LOAD_BUSINESS_PRICE,
  LOAD_BUSINESS_NUMBER,
  LOAD_BUSINESS_UNITS,
} from './constants';

const initialState = fromJS({
  detail: false,
  price: false,
  number: false,
  units: false,
  businessSupplier: {
    refresh: false,
    loading: false,
    list: false,
    hasNext: false,
  },
  businessDemand: {
    refresh: false,
    loading: false,
    list: false,
    hasNext: false,
  },
});

function businessPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MOMENT_DETAIL: {
      const { data } = action.payload;

      return state.set('detail', data);
    }
    case LOAD_BUSINESS: {
      const { type, list, page } = action.payload;
      const info = type === 1 ? state.get('businessSupplier') : state.get('businessDemand');

      const oldList = info.get('list');
      let newList = oldList ? oldList : [];
      let hasNext = true;

      if (page) {
        if (page.current_page === 1) {
          newList = list;
        } else if (page.current_page <= page.page_count) {
          newList = [...newList, ...list];
        }

        if (page.current_page >= page.page_count) {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      const result = info.set('list', newList)
        .set('hasNext', hasNext)
        .set('refresh', false)
        .set('loading', false);

      return type === 1 ? state.set('businessSupplier', result) : state.set('businessDemand', result);
    }
    case LOAD_BUSINESS_REFRESH: {
      const { type, refresh } = action.payload;
      const info = type === 1 ? state.get('businessSupplier') : state.get('businessDemand');

      const result = info.set('refresh', refresh);
      return type === 1 ? state.set('businessSupplier', result) : state.set('businessDemand', result);
    }
    case LOAD_BUSINESS_LOADING: {
      const { type, loading } = action.payload;
      const info = type === 1 ? state.get('businessSupplier') : state.get('businessDemand');

      const result = info.set('loading', loading);
      return type === 1 ? state.set('businessSupplier', result) : state.set('businessDemand', result);
    }
    case LOAD_BUSINESS_PRICE: {
      const { list } = action.payload;

      return state.set('price', list);
    }
    case LOAD_BUSINESS_NUMBER: {
      const { list } = action.payload;

      return state.set('number', list);
    }
    case LOAD_BUSINESS_UNITS: {
      const { list } = action.payload;

      return state.set('units', list);
    }
    default:
      return state;
  }
}

export default businessPageReducer;
