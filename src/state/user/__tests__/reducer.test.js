import userReducer, { userInitialState } from '../reducer'
import * as actions from '../action'
import { getActionObjectFromFunction } from '../../../test_utils'

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(userInitialState);
    })

    it('should handle ' + actions.userActionTypes.SET_EMAIL, () => {
        const action = getActionObjectFromFunction(actions.setEmail('testing@testy.test'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, email: 'testing@testy.test' });
    })

    it('should handle ' + actions.userActionTypes.SET_FAVORITE_ITEMS, () => {
        const action = getActionObjectFromFunction(actions.setFavoriteItems(['item_id_1', 'item_id_2']));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, favoriteItems: ['item_id_1', 'item_id_2'] });
    })

    it('should handle ' + actions.userActionTypes.SET_HAS_SEEN_TUTORIAL, () => {
        const action = getActionObjectFromFunction(actions.setHasSeenTutorial(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, hasSeenTutorial: true });
    })

    it('should handle ' + actions.userActionTypes.SET_IS_ADMIN, () => {
        const action = getActionObjectFromFunction(actions.setIsAdmin(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, isAdmin: true });
    })

    it('should handle ' + actions.userActionTypes.SET_IS_EMAIL_VERIFIED, () => {
        const action = getActionObjectFromFunction(actions.setIsEmailVerified(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, isEmailVerified: true });
    })

    it('should handle ' + actions.userActionTypes.SET_IS_LOADING, () => {
        const action = getActionObjectFromFunction(actions.setIsLoading(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, loading: true });
    })

    it('should handle ' + actions.userActionTypes.SET_IS_LOGGED_IN, () => {
        const action = getActionObjectFromFunction(actions.setIsLoggedIn(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, isLoggedIn: true });
    })

    it('should handle ' + actions.userActionTypes.SET_IS_PHONE_LINKED, () => {
        const action = getActionObjectFromFunction(actions.setIsPhoneLinked(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, isPhoneLinked: true });
    })

    it('should handle ' + actions.userActionTypes.SET_IS_SHIPPING_AGENT, () => {
        const action = getActionObjectFromFunction(actions.setIsShippingAgent(true));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, isShippingAgent: true });
    })

    it('should handle ' + actions.userActionTypes.SET_NAME, () => {
        const action = getActionObjectFromFunction(actions.setName('Johnny Test'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, name: 'Johnny Test' });
    })

    it('should handle ' + actions.userActionTypes.SET_PHONE, () => {
        const action = getActionObjectFromFunction(actions.setPhone('+254712345678'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, phone: '+254712345678' });
    })

    it('should handle ' + actions.userActionTypes.SET_PHOTO_URL, () => {
        const action = getActionObjectFromFunction(actions.setPhotoURL('https://path-to-an-awesome-pic.com/profile.jpg'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, photoURL: 'https://path-to-an-awesome-pic.com/profile.jpg' });
    })

    it('should handle ' + actions.userActionTypes.SET_REFRESH_TOKEN, () => {
        const action = getActionObjectFromFunction(actions.setRefreshToken('some_fancy_refresh_token'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, refreshToken: 'some_fancy_refresh_token' });
    })

    it('should handle ' + actions.userActionTypes.SET_UID, () => {
        const action = getActionObjectFromFunction(actions.setUid('some_unique_uid'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, uid: 'some_unique_uid' });
    })

    it('should handle ' + actions.userActionTypes.SET_USERNAME, () => {
        const action = getActionObjectFromFunction(actions.setUsername('testing@testy.test'));
        expect(userReducer(userInitialState, action)).toEqual({ ...userInitialState, username: 'testing@testy.test' });
    })
})