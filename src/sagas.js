import { all, call, put, takeEvery } from 'redux-saga/effects';

// Example worker saga: handles async actions for fetching tasks
function* fetchTasks() {
  try {
    const response = yield call(fetch, '/api/tasks'); // Replace with your API endpoint
    const data = yield response.json();
    yield put({ type: 'FETCH_TASKS_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_TASKS_FAILURE', error: error.message });
  }
}

// Watcher saga: spawns a new fetchTasks task on each FETCH_TASKS_REQUEST
function* watchFetchTasks() {
  yield takeEvery('FETCH_TASKS_REQUEST', fetchTasks);
}

// Root saga: combines all your sagas into one
export default function* rootSaga() {
  yield all([
    watchFetchTasks(),
    // Add more sagas here if needed
  ]);
}
