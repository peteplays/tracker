import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import dbDataReducer from './feature/dbData.slice';

export const store = configureStore({
  reducer: {
    dbData: dbDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
