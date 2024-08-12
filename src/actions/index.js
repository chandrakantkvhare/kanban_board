// src/actions/index.js
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const DRAG_AND_DROP = 'DRAG_AND_DROP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const moveTask = (taskId, newStage) => ({
  type: MOVE_TASK,
  payload: { taskId, newStage },
});

export const dragAndDrop = (sourceIndex, sourceStage, destinationIndex, destinationStage) => ({
  type: DRAG_AND_DROP,
  payload: { sourceIndex, sourceStage, destinationIndex, destinationStage },
});

export const login = (credentials) => ({
  type: LOGIN,
  payload: credentials,
});

export const logout = () => ({
  type: LOGOUT,
});
