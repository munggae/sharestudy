import axios from 'axios';
import { all, fork, put, takeLatest, takeEvery, throttle, call } from 'redux-saga/effects';
import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_COMMENT_REQUEST,
  LOAD_POSTS_COMMENT_SUCCESS,
  LOAD_POSTS_COMMENT_FAILURE,
  LOAD_GALLARY_REQUEST,
  LOAD_GALLARY_SUCCESS,
  LOAD_GALLARY_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  UPDATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  LIKE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_SUCCESS,
  ADD_RECOMMENT_REQUEST,
  ADD_RECOMMENT_FAILURE,
  ADD_RECOMMENT_SUCCESS,
  LIKE_LIST_REQUEST,
  LIKE_LIST_SUCCESS,
  LIKE_LIST_FAILURE,
  LOAD_POSTS_DETAIL_REQUEST,
  LOAD_POSTS_DETAIL_SUCCESS,
  LOAD_POSTS_DETAIL_FAILURE,
  LOAD_PROFILE_POSTS_REQUEST,
  LOAD_PROFILE_POSTS_SUCCESS,
  LOAD_PROFILE_POSTS_FAILURE
} from '../reducers/post';

function loadPostsAPI(data) {
  return axios.get(`/feed?page=${data?.page ? data.page : 1}`);
}
function uploadImagesAPI(data) {
  return axios.post('/feed/upload', data);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    //yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data
    });
  }
}

function loadProfilePostsAPI(data) {
  return axios.get(`/feed/other/${data.id}?page=${data?.page ? data.page : 1}`);
}

function* loadProfilePosts(action) {
  try {
    const result = yield call(loadProfilePostsAPI, action.data);
    yield put({
      type: LOAD_PROFILE_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PROFILE_POSTS_FAILURE,
      data: err.response.data
    });
  }
}

function loadPostsCommentsAPI(data) {
  return axios.get(`/feed/reply/${data.id}?page=${data?.page ? data.page : 1}`);
}
function* loadPostsComments(action) {
  try {
    const result = yield call(loadPostsCommentsAPI, action.data);
    yield put({
      type: LOAD_POSTS_COMMENT_SUCCESS,
      data: { id: action.data.id, list: result.data }
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_COMMENT_FAILURE,
      data: err.response.data
    });
  }
}
function loadGallaryAPI(data) {
  return axios.get('/gallary', data);
}
function* loadGallary(action) {
  try {
    const result = yield call(loadGallaryAPI, action.data);

    yield put({
      type: LOAD_GALLARY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_GALLARY_FAILURE,
      data: err.response.data
    });
  }
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);

    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data
    });
  }
}
function addPostAPI(data) {
  return axios.post('/feed', data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    });
  }
}
function removePostAPI(id) {
  return axios.delete(`/feed/${id}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function updatePostAPI(data) {
  let id =""
  for (var pair of data.entries()) {
     if(pair[0]==='id'){
      id=pair[1]
     }
  }
  return axios.patch(`/feed/${id}`, data);
}
function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function likePostAPI(id) {
  return axios.post(`/likefeed/${id}`);
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);

    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function unlikePostAPI(id) {
  return axios.delete(`/likefeed/${id}`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function addCommentAPI(data) {
  return axios.post(`/feed/reply/${data.id}`, data); // POST /post/1/comment
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}
function removeCommentAPI(id) {
  console.log('id' + id);
  return axios.delete(`/feed/reply/${id}`);
}
function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

function likeCommentAPI(id) {
  return axios.post(`/likefeedreply/${id}`);
}
function* likeComment(action) {
  try {
    const result = yield call(likeCommentAPI, action.data);

    yield put({
      type: LIKE_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}
function unlikeCommentAPI(id) {
  return axios.delete(`/likefeedreply/${id}`);
}

function* unlikeComment(action) {
  try {
    const result = yield call(unlikeCommentAPI, action.data);
    result.data.replyId = action.data;
    yield put({
      type: UNLIKE_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

function updateCommentAPI(data) {
  return axios.patch(`/feed/reply/${data.id}`, data);
}
function* updateComment(action) {
  try {
    const result = yield call(updateCommentAPI, action.data);

    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}
function loadLikeListAPI(id) {
  return axios.get(`/feed/likefeedlist/${id}`);
}
function* likeListComment(action) {
  try {
    const result = yield call(loadLikeListAPI, action.data);
    yield put({
      type: LIKE_LIST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LIKE_LIST_FAILURE,
      error: err.response.data
    });
  }
}
function loadPostDetailAPI(id) {
  return axios.get(`/feedDetail/${id}`);
}
function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.data);
    yield put({
      type: LOAD_POSTS_DETAIL_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_DETAIL_FAILURE,
      error: err.response.data
    });
  }
}

function addReCommentAPI(data) {
  return axios.post(`/feed/reply/re/${data.feedId}/${data.id}`, data); // POST /post/1/comment
}

function* addReComment(action) {
  try {
    const result = yield call(addReCommentAPI, action.data);
    yield put({
      type: ADD_RECOMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_RECOMMENT_FAILURE,
      error: err.response.data
    });
  }
}
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadProfilePosts() {
  yield takeLatest(LOAD_PROFILE_POSTS_REQUEST, loadProfilePosts);
}
function* watchLoadPostsComments() {
  yield takeLatest(LOAD_POSTS_COMMENT_REQUEST, loadPostsComments);
}
function* watchLoadGallary() {
  yield throttle(5000, LOAD_GALLARY_REQUEST, loadGallary);
}
function* watchUploadImages() {
  yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchLikePost() {
  yield throttle(1000, LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield throttle(1000, UNLIKE_POST_REQUEST, unlikePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}
function* watchLikeListComments() {
  yield takeLatest(LIKE_LIST_REQUEST, likeListComment);
}
function* watchLoadPostDetail() {
  yield takeLatest(LOAD_POSTS_DETAIL_REQUEST, loadPostDetail);
}
function* watchLikeComment() {
  yield takeLatest(LIKE_COMMENT_REQUEST, likeComment);
}
function* watchUnlikeComment() {
  yield takeLatest(UNLIKE_COMMENT_REQUEST, unlikeComment);
}
function* watchAddReComment() {
  yield takeLatest(ADD_RECOMMENT_REQUEST, addReComment);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadGallary),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchUpdatePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchUpdateComment),
    fork(watchLoadPostsComments),
    fork(watchLikeListComments),
    fork(watchLoadPostDetail),
    fork(watchLikeComment),
    fork(watchUnlikeComment),
    fork(watchAddReComment),
    fork(watchLoadProfilePosts)
  ]);
}
