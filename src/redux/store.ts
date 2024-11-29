import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Create the store
const store = createStore(persistedReducer, applyMiddleware(promise));

// Create a persistor for the store
const persistor = persistStore(store);

export { store, persistor };
