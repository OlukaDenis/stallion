import quoteReducer, { quoteInitialState } from '../reducer'
import * as actions from '../action'
import { getActionObjectFromFunction } from '../../../test_utils'

describe('quote reducer', () => {
    it('should return the initial state', () => {
        expect(quoteReducer(undefined, {})).toEqual(quoteInitialState);
    })

    it('should handle ' + actions.quoteActionTypes.SET_ORIGIN, () => {
        const action = getActionObjectFromFunction(actions.setOrigin('New Jersey, NJ, USA'));
        expect(quoteReducer(quoteInitialState, action)).toEqual({
          ...quoteInitialState,
          origin: 'New Jersey, NJ, USA',
        });
    })

    it('should handle ' + actions.quoteActionTypes.SET_DESTINATION, () => {
        const action = getActionObjectFromFunction(actions.setDestination('Los Angeles, CA, USA'));
        expect(quoteReducer(quoteInitialState, action)).toEqual({
          ...quoteInitialState,
          destination: 'Los Angeles, CA, USA',
        });
    })

    it('should handle ' + actions.quoteActionTypes.SET_CARS, () => {
        const action = getActionObjectFromFunction(actions.setCars({0: {year: '2013', make: 'Toyota', model: 'Mark X'}}));
        expect(quoteReducer(quoteInitialState, action)).toEqual({
          ...quoteInitialState,
          cars: { 0: { year: '2013', make: 'Toyota', model: 'Mark X' } },
        });
    })

  it('should handle ' + actions.quoteActionTypes.SET_PICKUP_DATE, () => {
    const action = getActionObjectFromFunction(actions.setPickupDate('2020-09-10'));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      pickupDate: '2020-09-10',
    });
  })

  it('should handle ' + actions.quoteActionTypes.SET_NAME, () => {
    const action = getActionObjectFromFunction(actions.setName('Thomas Marcus'));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      name: 'Thomas Marcus',
    });
  })

  it('should handle ' + actions.quoteActionTypes.SET_EMAIL, () => {
    const action = getActionObjectFromFunction(actions.setEmail('thomas@gmail.com'));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      email: 'thomas@gmail.com',
    });
  })

  it('should handle ' + actions.quoteActionTypes.SET_PHONE, () => {
    const action = getActionObjectFromFunction(actions.setPhone('109878787908'));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      phone: '109878787908',
    });
  })
})