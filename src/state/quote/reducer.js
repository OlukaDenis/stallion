import { quoteActionTypes } from './action';

export const quoteInitialState = {
  origin: '',
  destination: '',
  cars: {},
  pickupDate: '',
  name: '',
  email: '',
  phone: '',
  distance: 0,
  duration: 0,
  originName: '',
  originLat: 0,
  originLon: 0,
  destinationName: '',
  destinationLat: 0,
  destinationLon: 0
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
    case quoteActionTypes.SET_DISTANCE:
      return {
        ...state,
        distance: action.payload,
      };
    case quoteActionTypes.SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case quoteActionTypes.SET_ORIGIN_NAME:
      return {
        ...state,
        originName: action.payload,
      };
    case quoteActionTypes.SET_ORIGIN_LAT:
      return {
        ...state,
        originLat: action.payload,
      };
    case quoteActionTypes.SET_ORIGIN_LON:
      return {
        ...state,
        originLon: action.payload,
      };
    case quoteActionTypes.SET_DESTINATION_NAME:
      return {
        ...state,
        destinationName: action.payload,
      };
    case quoteActionTypes.SET_DESTINATION_LAT:
      return {
        ...state,
        destinationLat: action.payload,
      };
    case quoteActionTypes.SET_DESTINATION_LON:
      return {
        ...state,
        destinationLon: action.payload,
      };
    default:
      return state;
  }
}
