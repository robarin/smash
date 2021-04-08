import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/root';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [`globalModal`]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initStore = () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(logger),
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

const initialStore = initStore();

export const store = initialStore.store;
export const persistor = initialStore.persistor;
