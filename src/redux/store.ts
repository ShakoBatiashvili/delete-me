import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './slices/navigationSlice';
import translationsSlice from './slices/translationsSlice';
import parametersSlice from './slices/parametersSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    translations: translationsSlice,
    parameters: parametersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
