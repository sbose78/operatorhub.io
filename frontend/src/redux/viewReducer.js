import { reduxConstants } from './index';

const initialState = {
  activeFilters: {},
  keywordSearch: '',
  urlSearchString: '',
  sortType: '',
  viewType: ''
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.SET_ACTIVE_FILTERS:
      return Object.assign({}, state, { activeFilters: action.activeFilters });

    case reduxConstants.SET_KEYWORD_SEARCH:
      return Object.assign({}, state, { keywordSearch: action.keywordSearch });

    case reduxConstants.SET_SORT_TYPE:
      return Object.assign({}, state, { sortType: action.sortType });

    case reduxConstants.SET_VIEW_TYPE:
      return Object.assign({}, state, { viewType: action.viewType });

    case reduxConstants.SET_URL_SEARCH_STRING:
      return Object.assign({}, state, { urlSearchString: action.urlSearchString });

    default:
      return state;
  }
};

viewReducer.initialState = initialState;

export { initialState, viewReducer };
