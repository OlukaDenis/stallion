import cartReducer, { cartInitialState } from '../reducer'
import * as actions from '../action'
import { getActionObjectFromFunction } from '../../../test_utils'

describe('cart reducer', () => {
    it('should return the initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(cartInitialState);
    })

    it('should handle ' + actions.cartActionTypes.SET_CART_ITEMS, () => {
        const action = getActionObjectFromFunction(actions.setCartItems({ 'item_id_1': {}, 'item_id_3': {} }));
        expect(cartReducer(cartInitialState, action)).toEqual({ ...cartInitialState, items: { 'item_id_1': {}, 'item_id_3': {} } });
    })
})