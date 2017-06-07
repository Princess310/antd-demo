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

  FETCH_BUSINESS_PRICE,
  LOAD_BUSINESS_PRICE,

  FETCH_BUSINESS_NUMBER,
  LOAD_BUSINESS_NUMBER,

  FETCH_BUSINESS_UNITS,
  LOAD_BUSINESS_UNITS,

  FETCH_BUSINESS_REWARD,
  LOAD_BUSINESS_REWARD,
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

export function fetchBusiness(type, page, searchParams) {
  return {
    type: FETCH_BUSINESS,
    payload: {
      type,
      page,
      searchParams,
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

export function fetchBusinessPrice() {
  return {
    type: FETCH_BUSINESS_PRICE,
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

export function fetchBusinessNumber() {
  return {
    type: FETCH_BUSINESS_NUMBER,
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

export function fetchBusinessUnits() {
  return {
    type: FETCH_BUSINESS_UNITS,
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

export function fetchReward() {
  return {
    type: FETCH_BUSINESS_REWARD,
  };
}

export function loadReward(list) {
  return {
    type: LOAD_BUSINESS_REWARD,
    payload: {
      list,
    },
  };
}
