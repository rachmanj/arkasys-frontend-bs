import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BUCS_URL = 'https://localhost:3000/payreqs/bucs';

const initialState = {
  bucs: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchBucs = createAsyncThunk('bucs/fetchBucs', async () => {
  const response = await axios.get(BUCS_URL);
  return response.data;
});

const bucsSlice = createSlice({
  name: 'bucs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBucs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBucs.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchBucs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllBucs = state => state.bucs.bucs;
export const getBucsStatus = state => state.bucs.status;
export const getBucsError = state => state.bucs.error;

export default bucsSlice.reducer;
