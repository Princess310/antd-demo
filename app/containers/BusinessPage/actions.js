/*
 *
 * BusinessPage actions
 *
 */

import {
  FETCH_MOMENT_DETAIL,
  LOAD_MOMENT_DETAIL,

  FETCH_BUSINESS,
  LOAD_BUSINESS,
  LOAD_BUSINESS_REFRESH,
  LOAD_BUSINESS_LOADING,

  FETCH_BUSINESS_FILTER,
  LOAD_BUSINESS_PRICE,
  LOAD_BUSINESS_NUMBER,
  LOAD_BUSINESS_UNITS,
} from './constants';

export function fetchMomentDetail(id) {
  return {
    type: FETCH_MOMENT_DETAIL,
    payload: {
      id: id,
    },
  };
}

export function loadMomentDetail(data) {
  return {
    type: LOAD_MOMENT_DETAIL,
    payload: {
      data,
    },
  };
}

export function fetchBusiness(type, page, searchParams, doGetFilter) {
  return {
    type: FETCH_BUSINESS,
    payload: {
      type,
      page,
      searchParams,
      // doGetFilter, try to get filters when needed
      doGetFilter,
    },
  };
}

export function loadBusiness(type, list, page) {
  return {
    type: LOAD_BUSINESS,
    payload: {
      type,
      list,
      page,
    },
  };
}

export function loadBusinessRefresh(type, refresh) {
  return {
    type: LOAD_BUSINESS_REFRESH,
    payload: {
      type,
      refresh,
    },
  };
}

export function loadBusienssLoading(type, loading) {
  return {
    type: LOAD_BUSINESS_LOADING,
    payload: {
      type,
      loading,
    }, 
  };
}

export function fetchBusinessFilter() {
  return {
    type: FETCH_BUSINESS_FILTER,
  };
}

export function loadBusinessPrice(list) {
  return {
    type: LOAD_BUSINESS_PRICE,
    payload: {
      list,
    },
  };
}

export function loadBusinessNumber(list) {
  return {
    type: LOAD_BUSINESS_NUMBER,
    payload: {
      list,
    },
  };
}

export function loadBusinessUnits(list) {
  return {
    type: LOAD_BUSINESS_UNITS,
    payload: {
      list,
    },
  };
}
