export const userActionTypes = {
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN',
  SET_IS_PHONE_LINKED: 'SET_IS_PHONE_LINKED',
  SET_USERNAME: 'SET_USERNAME',
  SET_HAS_SEEN_TUTORIAL: 'SET_HAS_SEEN_TUTORIAL',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_NAME: 'SET_NAME',
  SET_PHONE: 'SET_PHONE',
  SET_EMAIL: 'SET_EMAIL',
  SET_UID: 'SET_UID',
  SET_IS_EMAIL_VERIFIED: 'SET_IS_EMAIL_VERIFIED',
  SET_PHOTO_URL: 'SET_PHOTO_URL',
  SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
  SET_IS_ADMIN: 'SET_IS_ADMIN',
  SET_IS_MANAGER: 'SET_IS_MANAGER',
  SET_IS_SHIPPING_AGENT: 'SET_IS_SHIPPING_AGENT',
  SET_IS_DRIVER: 'SET_IS_DRIVER',
  SET_FAVORITE_ITEMS: 'SET_FAVORITE_ITEMS',
};

export const userLoggedOut = () => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setIsLoggedIn(false));
  dispatch(setIsPhoneLinked(false));
  dispatch(setUsername(''));
  dispatch(setName(''));
  dispatch(setPhone(''));
  dispatch(setEmail(''));
  dispatch(setUid(''));
  dispatch(setIsEmailVerified(''));
  dispatch(setPhotoURL(''));
  dispatch(setRefreshToken(''));
  dispatch(setIsLoading(false));
  return true; 
};

export const setIsLoggedIn = (isLoggedIn) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_LOGGED_IN, payload: isLoggedIn });
};

export const setIsPhoneLinked = (isPhoneLinked) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_PHONE_LINKED, payload: isPhoneLinked });
};

export const setUsername = (username) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_USERNAME, payload: username });
};

export const setHasSeenTutorial = (hasSeenTutorial) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_HAS_SEEN_TUTORIAL, payload: hasSeenTutorial });
};

export const setIsLoading = (isLoading) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_LOADING, payload: isLoading });
};

export const setName = (name) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_NAME, payload: name });
};

export const setPhone = (phone) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_PHONE, payload: phone });
};

export const setEmail = (email) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_EMAIL, payload: email });
};

export const setUid = (uid) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_UID, payload: uid });
};

export const setIsEmailVerified = (isEmailVerified) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_EMAIL_VERIFIED, payload: isEmailVerified });
};

export const setPhotoURL = (photoURL) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_PHOTO_URL, payload: photoURL });
};

export const setRefreshToken = (refreshToken) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_REFRESH_TOKEN, payload: refreshToken });
};

export const setIsAdmin = (isAdmin) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_ADMIN, payload: isAdmin });
};

export const setIsManager = (isManager) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_MANAGER, payload: isManager });
};

export const setIsShippingAgent = (isShippingAgent) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_SHIPPING_AGENT, payload: isShippingAgent });
};

export const setIsDriver = (isDriver) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_IS_DRIVER, payload: isDriver });
};

export const setFavoriteItems = (favoriteItems) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_FAVORITE_ITEMS, payload: favoriteItems });
};
