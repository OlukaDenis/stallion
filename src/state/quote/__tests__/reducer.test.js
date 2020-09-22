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
  });

  it('should handle ' + actions.quoteActionTypes.SET_DISTANCE, () => {
    const action = getActionObjectFromFunction(actions.setDistance(900));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      distance: 900,
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_DURATION, () => {
    const action = getActionObjectFromFunction(actions.setDuration(20));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      duration: 20,
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_ORIGIN_NAME, () => {
    const action = getActionObjectFromFunction(actions.setOriginName('Brooklyn'));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      originName: 'Brooklyn',
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_ORIGIN_LAT, () => {
    const action = getActionObjectFromFunction(actions.setOriginLat(67.7823));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      originLat: 67.7823,
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_ORIGIN_LON, () => {
    const action = getActionObjectFromFunction(actions.setOriginLon(83.0903));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      originLon: 83.0903,
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_DESTINATION_NAME, () => {
    const action = getActionObjectFromFunction(actions.setDestinationName('Calif'));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      destinationName: 'Calif',
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_DESTINATION_LAT, () => {
    const action = getActionObjectFromFunction(actions.setDestinationLat(78.3232));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      destinationLat: 78.3232,
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_DESTINATION_LON, () => {
    const action = getActionObjectFromFunction(actions.setDestinationLon(89.3423));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      destinationLon: 89.3423,
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_PRIMARY_BOOKING_CONTACT, () => {
    const action = getActionObjectFromFunction(actions.setPrimaryBookingContact({mimi: 'You & I'}));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      primaryBookingContact: { mimi: 'You & I' },
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_PICKUP_LOCATION, () => {
    const action = getActionObjectFromFunction(actions.setPickupLocation({ mimi: 'You & I' }));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      pickupLocation: { mimi: 'You & I' },
    });
  });

  it('should handle ' + actions.quoteActionTypes.SET_DELIVERY_LOCATION, () => {
    const action = getActionObjectFromFunction(actions.setDeliveryLocation({ mimi: 'You & I' }));
    expect(quoteReducer(quoteInitialState, action)).toEqual({
      ...quoteInitialState,
      deliveryLocation: { mimi: 'You & I' },
    });
  });
})