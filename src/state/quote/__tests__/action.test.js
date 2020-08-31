import * as actions from '../action'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store;

describe('quote actions', () => {

    beforeEach(() => {
        store = mockStore({
          quote: {
            origin: 'New Jersey, NJ, USA',
            destination: 'Los Angeles, CA, USA',
            cars: {0: {year: '2013', make: 'Toyota', model: 'Mark X'}},
            pickupDate: '2020-09-23',
          },
        });
    });

    it('should create an action to set quote origin', () => {

        const payload = 'New Jersey, NJ, USA';

        const expectedAction = {
            type: actions.quoteActionTypes.SET_ORIGIN,
            payload
        }
        return expect(store.dispatch(actions.setOrigin(payload))).toEqual(expectedAction);
    })

    it('should create an action to set quote destination', () => {

        const payload = 'Los Angeles, CA, USA';

        const expectedAction = {
            type: actions.quoteActionTypes.SET_DESTINATION,
            payload
        }
        return expect(store.dispatch(actions.setDestination(payload))).toEqual(expectedAction);
    })

    it('should create an action to set cars whose quote is needed', () => {

        const payload = { 0: { year: '2013', make: 'Toyota', model: 'Mark X' } };

        const expectedAction = {
            type: actions.quoteActionTypes.SET_CARS,
            payload
        }
        return expect(store.dispatch(actions.setCars(payload))).toEqual(expectedAction);
    })

    it('should create an action to set quote pickup date', () => {

        const payload = '2020-09-23';

        const expectedAction = {
            type: actions.quoteActionTypes.SET_PICKUP_DATE,
            payload
        }
        return expect(store.dispatch(actions.setPickupDate(payload))).toEqual(expectedAction);
    })
})