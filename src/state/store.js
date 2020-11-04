import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import quote from './quote/reducer'
import ui from './ui/reducer'
import user from './user/reducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  ui,
  user,
  quote,
});

export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    
    if (state.quote) nextState.quote = state.quote; // preserve quote value on client side navigation
    if (state.ui) nextState.ui = state.ui; // preserve ui value on client side navigation
    if (state.user) nextState.user = state.user; // preserve user value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'superstallionlogistics_v2',
      whitelist: ['quote', 'ui', 'user'], // only whitelisted reducers will be persisted
      storage, // you can use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer

    const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware])); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(makeStore);