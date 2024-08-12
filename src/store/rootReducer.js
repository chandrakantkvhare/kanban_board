// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../reducers/taskreducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
});

export default rootReducer;
