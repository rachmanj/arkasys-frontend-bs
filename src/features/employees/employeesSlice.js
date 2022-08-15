import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const EMPLOYEES_URL = 'http://localhost:8080/payreq-support/api/employees';

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  async () => {
    const response = await axios.get(EMPLOYEES_URL);
    return response.data;
  }
);

const employeeEntity = createEntityAdapter({
  selectId: employee => employee.id,
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeeEntity.getInitialState(),
  extraReducers: {
    [getEmployees.fulfilled]: (state, action) => {
      employeeEntity.setAll(state, action.payload);
    },
  },
});

export const employeeSelectors = employeeEntity.getSelectors(
  state => state.employees
);

export default employeesSlice.reducer;
