import * as actions from '../action'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('cart actions', () => {
  it('should create an action to set the items in cart', () => {

    const store = mockStore({ cart: {items: {}} })
    const payload = { 'item_id_4': {} }
    const expectedAction = {
      type: actions.cartActionTypes.SET_CART_ITEMS,
      payload
    }
    return expect(store.dispatch(actions.setCartItems(payload))).toEqual(expectedAction);
  })
})