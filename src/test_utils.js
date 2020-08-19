import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './state/store';
import { uiInitialState } from './state/ui/reducer';
import { userInitialState } from './state/user/reducer';
// import { appWithTranslation } from './utilities/i18n'

export const initialState = {
  ui: uiInitialState,
  user: userInitialState,
};

const renderConnected = (ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderConnected;

export const getActionObjectFromFunction = (actionCreator) => {
  return actionCreator((action) => action);
}
