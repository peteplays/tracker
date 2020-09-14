import { createSlice } from '@reduxjs/toolkit'

import environment from '../../config';
import { AppThunk, RootState } from '../store';

interface IState {
  loading: boolean;
  errorMessage?: string;
  data: IData[];
}

export interface IData {
  _id?: any;
  date: string;
  times: {
    [time: string]: ICoordinates;
  };
};

export interface ICoordinates {
  lat: number;
  lng: number;
}

const initialState: IState = {
  loading: false,
  errorMessage: undefined,
  data: [],
}

const dbDataSlice = createSlice({
  name: 'dbData',
  initialState,
  reducers: {
    dbData: state => {
      state.loading = true;
    },
    dbDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    dbDataFailure: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

const { dbData, dbDataSuccess, dbDataFailure } = dbDataSlice.actions;

export const dbDataSelector = (state: RootState) => state.dbData;

export const fetchDBData = (): AppThunk => async dispatch => {
  dispatch(dbData());
  try {
    const r = await fetch(`${environment.api.URL}/data`);
    const data = await r.json();

    if (data.error) {
      dispatch(dbDataFailure(data.error.message));
      return;
    }

    dispatch(dbDataSuccess(data));
  } catch (error) {
    dispatch(dbDataFailure(error));
  }
}

export default dbDataSlice.reducer;
