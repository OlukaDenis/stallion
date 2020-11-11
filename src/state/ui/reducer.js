import { uiActionTypes } from './action'

export const uiInitialState = {
  theme: 'light',
  language: 'en',
  isSideMenuShowing: false,
  isLoadingNewPage: false,
  selectedOrder: {}
};

export default function reducer(state = uiInitialState, action) {
  switch (action.type) {
    case uiActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case uiActionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case uiActionTypes.SET_IS_SIDEMENU_SHOWING:
      return {
        ...state,
        isSideMenuShowing: action.payload,
      };
    case uiActionTypes.IS_LOADING_NEW_PAGE:
      return {
        ...state,
        isLoadingNewPage: action.payload,
      };
    case uiActionTypes.SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: action.payload,
      };
    default:
      return state;
  }
}