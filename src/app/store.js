import { configureStore } from '@reduxjs/toolkit';
import bucsReducer from '../features/bucs/bucsSlice';
import payreqsReducer from '../features/payreqs/payreqsSlice';
import employeesReducer from '../features/employees/employeesSlice';

export const store = configureStore({
  reducer: {
    bucs: bucsReducer,
    payreqs: payreqsReducer,
    employees: employeesReducer,
  },
});
