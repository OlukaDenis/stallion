export const cartActionTypes = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

export const setCartItems = (items) => (dispatch) => {
  return dispatch({ type: cartActionTypes.SET_CART_ITEMS, payload: items });
};