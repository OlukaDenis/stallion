export const quoteActionTypes = {
  SET_ORIGIN: 'SET_ORIGIN',
  SET_DESTINATION: 'SET_DESTINATION',
  SET_CARS: 'SET_CARS',
  SET_PICKUP_DATE: 'SET_PICKUP_DATE',
};

export const setOrigin = (origin) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_ORIGIN, payload: origin });
};

export const setDestination = (destination) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_DESTINATION, payload: destination });
};

export const setCars = (cars) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_CARS, payload: { ...cars } });
};

export const setPickupDate = (pickupDate) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_PICKUP_DATE, payload: pickupDate });
};
