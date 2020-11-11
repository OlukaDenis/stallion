export const uiActionTypes = {
  CHANGE_THEME: 'CHANGE_THEME',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  SET_IS_SIDEMENU_SHOWING: 'SET_IS_SIDEMENU_SHOWING',
  IS_LOADING_NEW_PAGE: 'IS_LOADING_NEW_PAGE',
  SELECTED_ORDER: 'SELECTED_ORDER',
};

export const changeTheme = (theme) => (dispatch) => {
  return dispatch({ type: uiActionTypes.CHANGE_THEME, payload: theme });
};

export const changeLanguage = (lang) => (dispatch) => {
  return dispatch({ type: uiActionTypes.CHANGE_LANGUAGE, payload: lang });
};

export const setIsSideMenuShowing = (isSideMenuShowing) => (dispatch) => {
  return dispatch({ type: uiActionTypes.SET_IS_SIDEMENU_SHOWING, payload: isSideMenuShowing });
};

export const setIsLoadingNewPage = (isLoadingNewPage) => (dispatch) => {
  return dispatch({ type: uiActionTypes.IS_LOADING_NEW_PAGE, payload: isLoadingNewPage });
};

export const setSelectedOrder = (quote) => (dispatch) => {
  return dispatch({type: uiActionTypes.SELECTED_ORDER, payload: { ...quote } });
};