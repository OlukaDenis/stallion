export const quoteActionTypes = {
         SET_ORIGIN: 'SET_ORIGIN',
         SET_DESTINATION: 'SET_DESTINATION',
         SET_CARS: 'SET_CARS',
         SET_PICKUP_DATE: 'SET_PICKUP_DATE',
         SET_NAME: 'SET_NAME',
         SET_EMAIL: 'SET_EMAIL',
         SET_PHONE: 'SET_PHONE',
         SET_DISTANCE: 'SET_DISTANCE',
         SET_DURATION: 'SET_DURATION',
         SET_ORIGIN_NAME: 'SET_ORIGIN_NAME',
         SET_ORIGIN_LAT: 'SET_ORIGIN_LAT',
         SET_ORIGIN_LON: 'SET_ORIGIN_LON',
         SET_DESTINATION_NAME: 'SET_DESTINATION_NAME',
         SET_DESTINATION_LAT: 'SET_DESTINATION_LAT',
         SET_DESTINATION_LON: 'SET_DESTINATION_LON',
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

export const setName = (name) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_NAME, payload: name });
};

export const setEmail = (email) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_EMAIL, payload: email });
};

export const setPhone = (phone) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_PHONE, payload: phone });
};

export const setDistance = (distance) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_DISTANCE, payload: distance });
};

export const setDuration = (duration) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_DURATION, payload: duration });
};

export const setOriginName = (name) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_ORIGIN_NAME, payload: name });
};

export const setOriginLat = (originLat) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_ORIGIN_LAT, payload: originLat });
};

export const setOriginLon = (originLon) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_ORIGIN_LON, payload: originLon });
};

export const setDestinationName = (name) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_DESTINATION_NAME, payload: name });
};

export const setDestinationLat = (destinationLat) => (dispatch) => {
         return dispatch({ type: quoteActionTypes.SET_DESTINATION_LAT, payload: destinationLat });
       };

export const setDestinationLon = (destinationLon) => (dispatch) => {
  return dispatch({ type: quoteActionTypes.SET_DESTINATION_LON, payload: destinationLon });
};
