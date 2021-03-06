import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_FAIL,
  ADD_FAVORITE_COMMENT,
  REMOVE_FAVORITE_COMMENT,
} from 'constants/comments.constants';
import axios from 'axios';

export const getComments = () => async (dispatch) => {
  dispatch({ type: GET_COMMENTS_REQUEST });
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments`
  );

  try {
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAIL,
      payload: error,
    });
  }
};

export const getPostComments = (id) => async (dispatch) => {
  dispatch({ type: GET_POST_COMMENTS_REQUEST });
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );

  try {
    dispatch({
      type: GET_POST_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_COMMENTS_FAIL,
      payload: error,
    });
  }
};

export const addFavoriteComment = (comment) => (dispatch, getState) => {
  dispatch({ type: ADD_FAVORITE_COMMENT, payload: comment });
  localStorage.setItem(
    'favoriteComments',
    JSON.stringify(getState().favoriteCommentsState.favoriteComments)
  );
};

export const removeFavoriteComment = (comment) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FAVORITE_COMMENT, payload: comment });
  localStorage.setItem(
    'favoriteComments',
    JSON.stringify(getState().favoriteCommentsState.favoriteComments)
  );
};
