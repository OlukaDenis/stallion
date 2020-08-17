import { makeStore } from '../store'
import { initialState } from '../../test_utils'

describe('redux store', () => {
    it('should create a redux store', () => {
        expect(makeStore(true).getState()).toEqual({ ...initialState, _persist: { version: -1, rehydrated: false }});
    })
})