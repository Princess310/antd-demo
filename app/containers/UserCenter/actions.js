/*
 *
 * UserCenter actions
 *
 */

import {
  SAVE_USER,
  FETCH_INDUSTRY,
  LOAD_INDUSTRY,
  FETCH_SERVICE,
  LOAD_SERVICE,
  FETCH_BUSINESS_INFO,
  LOAD_BUSINESS_INFO,
  SVAE_BUSINESS_INFO,
  FETCH_CITY_INFO,
  LAOD_CITY_INFO,
} from './constants';

export function saveUser(params) {
  return {
    type: SAVE_USER,
    payload: {
      params,
    },
  };
}

export function fetchIndustry() {
  return {
    type: FETCH_INDUSTRY,
  };
}

export function loadIndustry(list) {
  return {
    type: LOAD_INDUSTRY,
    payload: {
      list,
    },
  };
}

export function fetchService(id) {
  return {
    type: FETCH_SERVICE,
    payload: {
      id,
    },
  };
}

export function loadService(list) {
  return {
    type: LOAD_SERVICE,
    payload: {
      list,
    },
  };
}

export function fetchBusiness() {
  return {
    type: FETCH_BUSINESS_INFO,
  };
}

export function loadBusiness(data) {
  return {
    type: LOAD_BUSINESS_INFO,
    payload: {
      data,
    },
  };
}

export function saveBusiness(params) {
  return {
    type: SVAE_BUSINESS_INFO,
    payload: {
      params,
    },
  };
}

export function fetchCity() {
  return {
    type: FETCH_CITY_INFO,
  };
}

export function loadCity(data) {
  return {
    type: LAOD_CITY_INFO,
    payload: {
      data,
    },
  };
}