// src/reducers/taskreducer.js
import { ADD_TASK, EDIT_TASK, DELETE_TASK, MOVE_TASK, DRAG_AND_DROP } from '../actions/index';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, stage: action.payload.newStage }
            : task
        ),
      };
    case DRAG_AND_DROP:
      // Handle drag and drop logic
      return state;
    default:
      return state;
  }
};

export default taskReducer;
