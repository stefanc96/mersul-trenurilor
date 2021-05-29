import {createStore, Store} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from './store.interface';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store as Store<AppState, any>);
