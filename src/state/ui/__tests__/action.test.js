import * as actions from '../action'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store;

describe('ui actions', () => {

    beforeEach(() => {
        store = mockStore({
            ui: {
                theme: 'light',
                language: 'en',
                isSideMenuShowing: false,
                isLoadingNewPage: false
            }
        });
    });

    it('should create an action to change ui theme', () => {

        const payload = 'dark';

        const expectedAction = {
            type: actions.uiActionTypes.CHANGE_THEME,
            payload
        }
        return expect(store.dispatch(actions.changeTheme(payload))).toEqual(expectedAction);
    })

    it('should create an action to change ui language', () => {

        const payload = 'sw';

        const expectedAction = {
            type: actions.uiActionTypes.CHANGE_LANGUAGE,
            payload
        }
        return expect(store.dispatch(actions.changeLanguage(payload))).toEqual(expectedAction);
    })

    it('should create an action to toggle whether ui is showing side menu', () => {

        const payload = true;

        const expectedAction = {
            type: actions.uiActionTypes.SET_IS_SIDEMENU_SHOWING,
            payload
        }
        return expect(store.dispatch(actions.setIsSideMenuShowing(payload))).toEqual(expectedAction);
    })

    it('should create an action to toggle whether ui is loading new page', () => {

        const payload = true;

        const expectedAction = {
            type: actions.uiActionTypes.IS_LOADING_NEW_PAGE,
            payload
        }
        return expect(store.dispatch(actions.setIsLoadingNewPage(payload))).toEqual(expectedAction);
    })
})