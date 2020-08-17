import uiReducer, { uiInitialState } from '../reducer'
import * as actions from '../action'
import { getActionObjectFromFunction } from '../../../test_utils'

describe('ui reducer', () => {
    it('should return the initial state', () => {
        expect(uiReducer(undefined, {})).toEqual(uiInitialState);
    })

    it('should handle ' + actions.uiActionTypes.CHANGE_LANGUAGE, () => {
        const action = getActionObjectFromFunction(actions.changeLanguage('sw'));
        expect(uiReducer(uiInitialState, action)).toEqual({ ...uiInitialState, language: 'sw' });
    })

    it('should handle ' + actions.uiActionTypes.CHANGE_THEME, () => {
        const action = getActionObjectFromFunction(actions.changeTheme('dark'));
        expect(uiReducer(uiInitialState, action)).toEqual({ ...uiInitialState, theme: 'dark' });
    })

    it('should handle ' + actions.uiActionTypes.SET_IS_SIDEMENU_SHOWING, () => {
        const action = getActionObjectFromFunction(actions.setIsSideMenuShowing(true));
        expect(uiReducer(uiInitialState, action)).toEqual({ ...uiInitialState, isSideMenuShowing: true });
    })

    it('should handle ' + actions.uiActionTypes.IS_LOADING_NEW_PAGE, () => {
        const action = getActionObjectFromFunction(actions.setIsLoadingNewPage(true));
        expect(uiReducer(uiInitialState, action)).toEqual({ ...uiInitialState, isLoadingNewPage: true });
    })
})