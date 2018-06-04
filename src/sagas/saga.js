import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { fetch } from '../services/webService'

function* userSaga() {
  yield takeEvery('FETCH_USER_REQUERSTED', fetchUser);
}

function* fetchUser() {
  try {
    const users = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
    yield put({ 
      type: 'USER_FETCH_SUCCEEDED', 
      users: users 
    });
  } catch (error) {
    yield put({ 
      type: 'USER_FETCH_FAILED', 
      users: [] 
    });
  }
}

export {
  userSaga
}