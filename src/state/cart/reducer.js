import { cartActionTypes } from './action';

export const cartInitialState = {
  items: {}
};

export default function reducer(state = cartInitialState, action) {
  switch (action.type) {
    case cartActionTypes.SET_CART_ITEMS:
      return {
        ...state,
        items: Object.assign({}, action.payload),
      };
    default:
      return state;
  }
}