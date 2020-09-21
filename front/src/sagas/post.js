import axios from 'axios';
import shortId from 'shortid';
import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
    generateDummyPost,
    generateDummyGallary,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_GALLARY_REQUEST,
    LOAD_GALLARY_SUCCESS,
    LOAD_GALLARY_FAILURE
  } from '../reducers/post';

function loadPostsAPI(data) {
    return axios.get('/api/posts', data);
}

function* loadPosts(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
        type: LOAD_POSTS_SUCCESS,
        data: generateDummyPost(10),
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_POSTS_FAILURE,
        data: err.response.data,
        });
    }
}
function* loadGallary(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
        type: LOAD_GALLARY_SUCCESS,
        data: action.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_GALLARY_FAILURE,
        data: err.response.data,
        });
    }
}
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadGallary() {
    yield throttle(5000, LOAD_GALLARY_REQUEST, loadGallary);
}

export default function* postSaga() {
yield all([
        fork(watchLoadPosts),
        fork(watchLoadGallary)
    ]);
}
  