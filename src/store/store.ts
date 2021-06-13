import {applyMiddleware, createStore, Store} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from './store.interface';
import {Platform} from 'react-native';

let persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

if (Platform.OS === 'android') {
  const {createRealmPersistStorage} = require('@bankify/redux-persist-realm');

  persistConfig.storage = createRealmPersistStorage();
}
const middlewares = [
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store as Store<AppState, any>);
