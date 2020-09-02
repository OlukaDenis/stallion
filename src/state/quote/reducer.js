import { quoteActionTypes } from './action';

export const quoteInitialState = {
  origin: '',
  destination: '',
  cars: {},
  pickupDate: '',
  name: '',
  email: '',
  phone: ''
};

export default function reducer(state = quoteInitialState, action) {
  switch (action.type) {
    case quoteActionTypes.SET_ORIGIN:
      return {
        ...state,
        origin: action.payload,
      };
    case quoteActionTypes.SET_DESTINATION:
      return {
        ...state,
        destination: action.payload,
      };
    case quoteActionTypes.SET_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case quoteActionTypes.SET_PICKUP_DATE:
      return {
        ...state,
        pickupDate: action.payload,
      };
    case quoteActionTypes.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case quoteActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case quoteActionTypes.SET_PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    default:
      return state;
  }
}
