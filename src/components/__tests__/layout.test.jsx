import React from 'react';
import render, { initialState } from '../../test_utils';
import { screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import BaseLayoutConnected, { BaseLayout } from '../layout';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;
let baseLayoutComponent;

test('BaseLayout Component: main layout component should match snapshot', () => {
  store = mockStore(initialState);

  baseLayoutComponent = renderer.create(
    <Provider store={store}>
      <BaseLayoutConnected t={(key) => key}></BaseLayoutConnected>
    </Provider>
  );
  expect(baseLayoutComponent.toJSON()).toMatchSnapshot();
});

test('BaseLayout Component: Renders the connected BaseLayout with initialState', () => {
  store = mockStore(initialState);
  baseLayoutComponent = render(<BaseLayoutConnected></BaseLayoutConnected>, { initialState: initialState });
  expect(screen.getAllByText(/button.theme.light/i)).toHaveLength(2);
});
