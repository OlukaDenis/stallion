import * as actions from '../action'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store;

describe('user actions', () => {

    beforeEach(() => {
        store = mockStore({
            user: {
                isLoggedIn: false,
                isPhoneLinked: false,
                username: '',
                hasSeenTutorial: false,
                loading: false,
                name: '',
                phone: '',
                email: '',
                uid: '',
                isEmailVerified: false,
                photoURL: '',
                refreshToken: '',
                isAdmin: false,
                isShippingAgent: false,
                favoriteItems: []
            }
        });
    });

    it('should create an action to change user logged in status', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_IS_LOGGED_IN,
            payload
        }
        return expect(store.dispatch(actions.setIsLoggedIn(payload))).toEqual(expectedAction);
    })

    it('should create an action to change if phone is linked', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_IS_PHONE_LINKED,
            payload
        }
        return expect(store.dispatch(actions.setIsPhoneLinked(payload))).toEqual(expectedAction);
    })

    it('should create an action to set logged in user\'s username', () => {

        const payload = 'thomas@timensio.gz';

        const expectedAction = {
            type: actions.userActionTypes.SET_USERNAME,
            payload
        }
        return expect(store.dispatch(actions.setUsername(payload))).toEqual(expectedAction);
    })

    it('should create an action to toggle flag if tutorial was seen by user', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_HAS_SEEN_TUTORIAL,
            payload
        }
        return expect(store.dispatch(actions.setHasSeenTutorial(payload))).toEqual(expectedAction);
    })

    it('should create an action to toggle if any user data is being loaded', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_IS_LOADING,
            payload
        }
        return expect(store.dispatch(actions.setIsLoading(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s name', () => {

        const payload = 'Johnny Test';

        const expectedAction = {
            type: actions.userActionTypes.SET_NAME,
            payload
        }
        return expect(store.dispatch(actions.setName(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s phone', () => {

        const payload = '+254712345678';

        const expectedAction = {
            type: actions.userActionTypes.SET_PHONE,
            payload
        }
        return expect(store.dispatch(actions.setPhone(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s email', () => {

        const payload = 'testing@testy.test';

        const expectedAction = {
            type: actions.userActionTypes.SET_EMAIL,
            payload
        }
        return expect(store.dispatch(actions.setEmail(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s UID', () => {

        const payload = 'some_unique_uid';

        const expectedAction = {
            type: actions.userActionTypes.SET_UID,
            payload
        }
        return expect(store.dispatch(actions.setUid(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s email verification status', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_IS_EMAIL_VERIFIED,
            payload
        }
        return expect(store.dispatch(actions.setIsEmailVerified(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s profile pic URL', () => {

        const payload = 'https://path-to-that-perfect.pic/profile.png';

        const expectedAction = {
            type: actions.userActionTypes.SET_PHOTO_URL,
            payload
        }
        return expect(store.dispatch(actions.setPhotoURL(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s refresh token', () => {

        const payload = 'some-fancy-refresh-token';

        const expectedAction = {
            type: actions.userActionTypes.SET_REFRESH_TOKEN,
            payload
        }
        return expect(store.dispatch(actions.setRefreshToken(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s admin privileges', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_IS_ADMIN,
            payload
        }
        return expect(store.dispatch(actions.setIsAdmin(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s shop owner privileges', () => {

        const payload = true;

        const expectedAction = {
            type: actions.userActionTypes.SET_IS_SHIPPING_AGENT,
            payload
        }
        return expect(store.dispatch(actions.setIsShippingAgent(payload))).toEqual(expectedAction);
    })

    it('should create an action to set the logged in user\'s favorite items', () => {

        const payload = ['item_id_1', 'item_id_2'];

        const expectedAction = {
            type: actions.userActionTypes.SET_FAVORITE_ITEMS,
            payload
        }
        return expect(store.dispatch(actions.setFavoriteItems(payload))).toEqual(expectedAction);
    })
})