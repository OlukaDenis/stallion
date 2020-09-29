import * as actions from '../action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('quote actions', () => {
  beforeEach(() => {
    store = mockStore({
      quote: {
        origin: 'New Jersey, NJ, USA',
        destination: 'Los Angeles, CA, USA',
        cars: { 0: { year: '2013', make: 'Toyota', model: 'Mark X' } },
        pickupDate: '2020-09-23',
      },
    });
  });

  it('should create an action to set quote ID', () => {
    const payload = '123456';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_ID,
      payload,
    };
    return expect(store.dispatch(actions.setID(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote origin', () => {
    const payload = 'New Jersey, NJ, USA';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_ORIGIN,
      payload,
    };
    return expect(store.dispatch(actions.setOrigin(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination', () => {
    const payload = 'Los Angeles, CA, USA';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DESTINATION,
      payload,
    };
    return expect(store.dispatch(actions.setDestination(payload))).toEqual(expectedAction);
  });

  it('should create an action to set cars whose quote is needed', () => {
    const payload = { 0: { year: '2013', make: 'Toyota', model: 'Mark X' } };

    const expectedAction = {
      type: actions.quoteActionTypes.SET_CARS,
      payload,
    };
    return expect(store.dispatch(actions.setCars(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote pickup date', () => {
    const payload = '2020-09-23';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_PICKUP_DATE,
      payload,
    };
    return expect(store.dispatch(actions.setPickupDate(payload))).toEqual(expectedAction);
  });

  it("should create an action to set client's name", () => {
    const payload = 'Thomas Marcus';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_NAME,
      payload,
    };
    return expect(store.dispatch(actions.setName(payload))).toEqual(expectedAction);
  });

  it("should create an action to set client's email", () => {
    const payload = 'thomas@gmail.com';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_EMAIL,
      payload,
    };
    return expect(store.dispatch(actions.setEmail(payload))).toEqual(expectedAction);
  });

  it("should create an action to set client's phone number", () => {
    const payload = '109878787908';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_PHONE,
      payload,
    };
    return expect(store.dispatch(actions.setPhone(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote approx. distance', () => {
    const payload = 900;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DISTANCE,
      payload,
    };
    return expect(store.dispatch(actions.setDistance(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote delivery duration', () => {
    const payload = 20;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DURATION,
      payload,
    };
    return expect(store.dispatch(actions.setDuration(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote origin name (encoded)', () => {
    const payload = 'Brooklyn';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_ORIGIN_NAME,
      payload,
    };
    return expect(store.dispatch(actions.setOriginName(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination', () => {
    const payload = 23.0923;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_ORIGIN_LAT,
      payload,
    };
    return expect(store.dispatch(actions.setOriginLat(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote origin longitude', () => {
    const payload = -89.2323;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_ORIGIN_LON,
      payload,
    };
    return expect(store.dispatch(actions.setOriginLon(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination name (encoded)', () => {
    const payload = 'Calif';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DESTINATION_NAME,
      payload,
    };
    return expect(store.dispatch(actions.setDestinationName(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination latitude', () => {
    const payload = -10.232;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DESTINATION_LAT,
      payload,
    };
    return expect(store.dispatch(actions.setDestinationLat(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination longitude', () => {
    const payload = 23.789;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DESTINATION_LON,
      payload,
    };
    return expect(store.dispatch(actions.setDestinationLon(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote primary booking contact', () => {
    const payload = {
      mimi: 'You & I',
    };

    const expectedAction = {
      type: actions.quoteActionTypes.SET_PRIMARY_BOOKING_CONTACT,
      payload,
    };
    return expect(store.dispatch(actions.setPrimaryBookingContact(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination longitude', () => {
    const payload = {
      mimi: 'You & I',
    };

    const expectedAction = {
      type: actions.quoteActionTypes.SET_PICKUP_LOCATION,
      payload,
    };
    return expect(store.dispatch(actions.setPickupLocation(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote destination longitude', () => {
    const payload = {
      mimi: 'You & I',
    };

    const expectedAction = {
      type: actions.quoteActionTypes.SET_DELIVERY_LOCATION,
      payload,
    };
    return expect(store.dispatch(actions.setDeliveryLocation(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote Firebase reference ID', () => {
    const payload = 'some-ref-id';

    const expectedAction = {
      type: actions.quoteActionTypes.SET_FIREBASE_REF_ID,
      payload,
    };
    return expect(store.dispatch(actions.setFirebaseRefID(payload))).toEqual(expectedAction);
  });

  it('should create an action to set quote payment status', () => {
    const payload = true;

    const expectedAction = {
      type: actions.quoteActionTypes.SET_IS_PAID,
      payload,
    };
    return expect(store.dispatch(actions.setIsPaid(payload))).toEqual(expectedAction);
  });
});
