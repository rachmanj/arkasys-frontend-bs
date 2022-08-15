import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const BUCS_URL = 'http://localhost:8080/payreq-support/api/bucs';

export const getBucs = createAsyncThunk('bucs/getBucs', async () => {
  const response = await axios.get(BUCS_URL);
  return response.data;
});

const bucEntity = createEntityAdapter({
  selectId: buc => buc.id,
});

const bucsSlice = createSlice({
  name: 'bucs',
  initialState: bucEntity.getInitialState(),
  extraReducers: {
    [getBucs.fulfilled]: (state, action) => {
      bucEntity.setAll(state, action.payload);
    },
  },
});

export const bucSelectors = bucEntity.getSelectors(state => state.bucs);

export default bucsSlice.reducer;
