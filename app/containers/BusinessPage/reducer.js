/*
 *
 * BusinessPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MOMENT_DETAIL,
  REFRESH_LIST_NEW_MOMENT,
  REMOVE_LIST_MOMENT,

  LOAD_BUSINESS,
  LOAD_BUSINESS_REFRESH,
  LOAD_BUSINESS_LOADING,

  LOAD_BUSINESS_PRICE,
  LOAD_BUSINESS_NUMBER,
  LOAD_BUSINESS_UNITS,
  LOAD_BUSINESS_REWARD,

  LOAD_BUSINESS_SEARCH_PARAMS,

  LOAD_BUSINESS_SEARCH_PANEL,
  LOAD_BUSINESS_SEARCH_ALL,
  LOAD_BUSINESS_SEARCH_ALL_LOADING,

  LOAD_PUBLISH_PARAMS,
} from './constants';

const initialState = fromJS({
  detail: false,
  price: false,
  number: false,
  units: false,
  reward: false,
  searchPanel: false,
  // record params when publish moment
  publishParams: {},
  searchAll: {
    loading: false,
    list: false,
    hasNext: false,
  },
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
    case REFRESH_LIST_NEW_MOMENT: {
      const { data } = action.payload;
      let supplier = state.get('businessSupplier');
      const supplierList = supplier.get('list');
      let demand = state.get('businessDemand');
      const demandList = demand.get('list');
      const newSupplierList = [];
      const newDemandList = [];

      // try to refresh moment for list
      if (supplierList) {
        supplierList.forEach((m, i) => {
          if (m.id === data.id) {
            newSupplierList[i] = data;
          } else {
            newSupplierList[i] = m;
          }
        });

        supplier = supplier.set('list', newSupplierList);
      }

      if (demandList) {
        demandList.forEach((m, i) => {
          if (m.id === data.id) {
            newDemandList[i] = data;
          } else {
            newDemandList[i] = m;
          }
        });

        demand = demand.set('list', newDemandList);
      }

      return state.set('businessSupplier', supplier).set('businessDemand', demand);
    }
    case REMOVE_LIST_MOMENT: {
      const { id } = action.payload;

      const { data } = action.payload;
      let supplier = state.get('businessSupplier');
      let supplierList = supplier.get('list');
      let demand = state.get('businessDemand');
      let demandList = demand.get('list');
      let newSupplierList = [];
      let newDemandList = [];

      // try to refresh moment for list
      if (supplierList) {
        supplierList = supplierList.filter((m) => (
          m.id !== id
        ));

        supplier = supplier.set('list', supplierList);
      }

      if (demandList) {
        demandList = demandList.filter((m) => (
          m.id !== id
        ));

        demand = demand.set('list', demandList);
      }

      return state.set('businessSupplier', supplier).set('businessDemand', demand);
    }
    case LOAD_BUSINESS: {
      const { type, list, page } = action.payload;
      const info = type === 1 ? state.get('businessSupplier') : state.get('businessDemand');

      const oldList = info.get('list') ? info.get('list') : [];
      let newList = [];
      let hasNext = true;

      if (page) {
        if (page.current_page === 1) {
          newList = list;
        } else if (page.current_page <= page.page_count) {
          newList = [...oldList, ...list];
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
    case LOAD_BUSINESS_REWARD: {
      const { list } = action.payload;

      return state.set('reward', list);
    }
    case LOAD_BUSINESS_SEARCH_PANEL: {
      const { data: { demand_more, supplier_more, users_more, demand, supplier, users } } = action.payload;
      const searchPanel = {
        demand_more,
        supplier_more,
        users_more,
        demand,
        supplier,
        users,
      };

      return state.set('searchPanel', searchPanel);
    }
    case LOAD_BUSINESS_SEARCH_ALL: {
      const { list, page } = action.payload;
      const info = state.get('searchAll');

      const oldList = info.get('list') ? info.get('list') : [];
      let newList = [];
      let hasNext = true;

      if (page) {
        if (page.current_page === 1) {
          newList = list;
        } else if (page.current_page <= page.page_count) {
          newList = [...oldList, ...list];
        }

        if (page.current_page >= page.page_count) {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      const result = info.set('list', newList)
        .set('hasNext', hasNext)
        .set('loading', false);

      return state.set('searchAll', result);
    }
    case LOAD_BUSINESS_SEARCH_ALL_LOADING: {
      const { loading } = action.payload;

      const info = state.get('searchAll');

      const result = info.set('loading', loading);
      return state.set('searchAll', result);
    }
    case LOAD_PUBLISH_PARAMS: {
      const { params } = action.payload;
      let newParams = state.get('publishParams');

      if (!params) {
        newParams = {};
      } else {
        for (let key in params) {
          newParams[key] = params[key];
        }
      }

      return state.set('publishParams', newParams);
    }
    default:
      return state;
  }
}

export default businessPageReducer;
