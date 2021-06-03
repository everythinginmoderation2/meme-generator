import * as types from "../constants/memesList.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_API = process.env.REACT_APP_BACKEND_API

const memesListActions = {
  getMemes: (pageNum, limit, query) => async (dispatch) => {
    dispatch({ type: types.GET_MEMES_LIST_REQUEST });
    try {
      let url = `http://localhost:5000/memes?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const response = await api.get(url);
      console.log(`This is ${JSON.stringify(response.data)}`)
      dispatch({ type: types.GET_MEMES_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.GET_MEMES_LIST_FAILURE, payload: error });
    }
  },

  getSingleMeme: (meme) => async (dispatch) => {
    dispatch({ type: types.GET_SINGLE_MEME_REQUEST });
    console.log("trying to load meme with ID of", meme.id);
    try {
      const response = await api.get(`http://localhost:5000/memes/${meme.id}`);
      dispatch({ type: types.GET_SINGLE_MEME_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.GET_SINGLE_MEME_FAILURE, payload: error });
    }
  },

  postSingleMeme: (meme) => async (dispatch) => {
    dispatch({ type: types.POST_SINGLE_MEME_REQUEST });
    console.log(meme)
    try {
      const response = await api.post(`http://localhost:5000/memes`, meme);
      console.log(response)
      dispatch({ type: types.POST_SINGLE_MEME_SUCCESS, payload: response.data });
      toast.configure();
      await toast.success("👌 Another One!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.replace("http://localhost:3000/");
    } catch (error) {
      dispatch({ type: types.POST_SINGLE_MEME_FAILURE, payload: error });
    }
  },

  updateSingleMeme: (meme, newMeme) => async (dispatch) => {
    dispatch({ type: types.UPDATE_SINGLE_MEME_REQUEST });
    try {
      const response = await api.put(`${BACKEND_API}/memes/${meme.id}`, newMeme);
      console.log("new meme", newMeme);
      dispatch({ type: types.UPDATE_SINGLE_MEME_SUCCESS, payload: response.data });
      toast.configure();
      await toast.success("🦄 ooooo, Your Blog Has Been Updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.replace("http://localhost:3000/");
    } catch (error) {
      dispatch({ type: types.UPDATE_SINGLE_MEME_FAILURE, payload: error });
    }
  },

  deleteSingleMeme: (meme) => async (dispatch) => {
    dispatch({ type: types.DELETE_SINGLE_MEME_REQUEST });
    try {
      console.log(meme.id);
      const response = await api.delete(`${BACKEND_API}/memes/${meme.id}`);
      console.log("deleting", response);
      dispatch({ type: types.DELETE_SINGLE_MEME_SUCCESS });
      toast.configure();
      await toast.success("🌒 Woohoo, Your Blog Has Been Updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.replace("http://localhost:3000/");
    } catch (error) {
      dispatch({ type: types.DELETE_SINGLE_MEME_FAILURE, payload: error });
    }
  },
};

export default memesListActions;
