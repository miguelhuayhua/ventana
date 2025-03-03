import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer<any>(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer
});
const persistor = persistStore(store);

export { store, persistor };