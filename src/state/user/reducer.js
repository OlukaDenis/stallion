import { userActionTypes } from './action'

export const userInitialState = {
  isLoggedIn: false,
  isPhoneLinked: false,
  username: '',
  hasSeenTutorial: false,
  loading: false,
  name: '',
  phone: '',
  email: '',
  uid: '',
  isEmailVerified: false,
  photoURL: '',
  refreshToken: '',
  isAdmin: false,
  isManager: true,
  isShippingAgent: false,
  isDriver: false,
  favoriteItems: []
}

export default function reducer(state = userInitialState, action) {
  switch (action.type) {
    case userActionTypes.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case userActionTypes.SET_IS_PHONE_LINKED:
      return {
        ...state,
        isPhoneLinked: action.payload,
      };
    case userActionTypes.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case userActionTypes.SET_HAS_SEEN_TUTORIAL:
      return {
        ...state,
        hasSeenTutorial: action.payload,
      };
    case userActionTypes.SET_IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case userActionTypes.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case userActionTypes.SET_PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case userActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case userActionTypes.SET_UID:
      return {
        ...state,
        uid: action.payload,
      };
    case userActionTypes.SET_IS_EMAIL_VERIFIED:
      return {
        ...state,
        isEmailVerified: action.payload,
      };
    case userActionTypes.SET_PHOTO_URL:
      return {
        ...state,
        photoURL: action.payload,
      };
    case userActionTypes.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };
    case userActionTypes.SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case userActionTypes.SET_IS_MANAGER:
      return {
        ...state,
        isManager: action.payload,
      };
    case userActionTypes.SET_IS_SHIPPING_AGENT:
      return {
        ...state,
        isShippingAgent: action.payload,
      };
    case userActionTypes.SET_IS_DRIVER:
      return {
        ...state,
        isDriver: action.payload,
      };
    case userActionTypes.SET_FAVORITE_ITEMS:
      return {
        ...state,
        favoriteItems: [...action.payload],
      };
    default:
      return state;
  }
}