import { combineReducers } from 'redux';
import { operatorsReducer } from './operatorsReducer';
import { viewReducer } from './viewReducer';

const GET_OPERATORS = 'GET_OPERATORS';
const GET_OPERATOR = 'GET_OPERATOR';

const SET_ACTIVE_FILTERS = 'SET_ACTIVE_FILTERS';
const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
const SET_KEYWORD_SEARCH = 'SET_KEYWORD_SEARCH';
const SET_SORT_TYPE = 'SET_SORT_TYPE';
const SET_VIEW_TYPE = 'SET_VIEW_TYPE';

const SET_URL_SEARCH_STRING = 'SET_URL_SEARCH_STRING';

const reduxConstants = {
  GET_OPERATORS,
  GET_OPERATOR,
  SET_ACTIVE_FILTERS,
  SET_SELECTED_CATEGORY,
  SET_KEYWORD_SEARCH,
  SET_SORT_TYPE,
  SET_VIEW_TYPE,
  SET_URL_SEARCH_STRING
};

const reducers = {
  operatorsState: operatorsReducer,
  viewState: viewReducer
};

const reduxReducers = combineReducers(reducers);

export { reduxConstants, reduxReducers, reducers };
