import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialStore = {

};

const persistConfig = {
  key: 'root',
  storage
};
const pReducer = persistReducer(persistConfig, rootReducer);

let middleware = [thunk];

const store = createStore(pReducer, initialStore, applyMiddleware(...middleware));

const persistor = persistStore(store);
export { persistor, store };
