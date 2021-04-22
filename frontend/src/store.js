import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/root';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['currentUser', 'surveyResult']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initStore = () => {
  let store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(logger, thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

const initialStore = initStore();

export const store = initialStore.store;
export const persistor = initialStore.persistor;
