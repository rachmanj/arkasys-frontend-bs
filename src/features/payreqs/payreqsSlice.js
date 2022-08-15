import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

// const PAYREQS_URL = 'http://localhost:3500/payreqs/payreqs';
const PAYREQS_URL = 'http://localhost:8080/payreq-support/api/payreqs';

const payreqEntity = createEntityAdapter({
  selectId: payreq => payreq.id,
});

export const getPayreqs = createAsyncThunk('payreqs/getPayreqs', async () => {
  const response = await axios.get(PAYREQS_URL);
  return response.data;
});

export const addNewPayreq = createAsyncThunk(
  'payreqs/createPayreq',
  async payreq => {
    try {
      const response = await axios.post('PYREQS_URL', payreq);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const payreqsSlice = createSlice({
  name: 'payreqs',
  initialState: payreqEntity.getInitialState(),
  extraReducers: {
    [getPayreqs.fulfilled]: (state, action) => {
      payreqEntity.setAll(state, action.payload);
    },
  },
});

export const payreqSelectors = payreqEntity.getSelectors(
  state => state.payreqs
);

export default payreqsSlice.reducer;
