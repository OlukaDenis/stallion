import React from 'react';
import render, { initialState } from '../../test_utils';
import { screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import BaseLayoutConnected from '../layout';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;
let baseLayoutComponent;

describe('BaseLayout Component', () => {
  beforeEach(() => {
    store = mockStore(initialState);

    baseLayoutComponent = renderer.create(
      <Provider store={store}>
        <BaseLayoutConnected t={(key) => key}></BaseLayoutConnected>
      </Provider>
    );
  });

  it('main layout component should match snapshot', () => {
    expect(baseLayoutComponent.toJSON()).toMatchSnapshot();
  });
});

describe('BaseLayout Component', () => {

  beforeEach(() => {
    store = mockStore(initialState);
    baseLayoutComponent = render(<BaseLayoutConnected></BaseLayoutConnected>, { initialState: initialState });
  });

  it('Renders the connected BaseLayout with initialState', () => {
    expect(screen.getAllByText(/button.theme.light/i)).toHaveLength(2);
  });
});
