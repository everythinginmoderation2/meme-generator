import * as types from "../constants/memesList.constants";

const initialState = {
  //all memes
  loading: false,
  memes: [],
  totalPages: 1,

  //single meme
  selectedMeme: null,
  loadingSelectedMeme: false,
  error: null,

  // //post meme
  newMeme: {},
};

const memesListReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    //get all memes
    case types.GET_MEMES_LIST_REQUEST:
      return { ...state, loading: true };
    case types.GET_MEMES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        memes: payload.memes,
        totalPages: payload.totalPages,
      };
    case types.GET_MEMES_LIST_FAILURE:
      return { ...state, loading: false, error: payload.message };

    //post a single meme
    case types.POST_SINGLE_MEME_REQUEST:
      return { ...state, loading: true };
    case types.POST_SINGLE_MEME_SUCCESS:
      return {
        ...state,
        loading: false,
        newMeme: payload
      };

    //get a single meme
    case types.GET_SINGLE_MEME_REQUEST:
      return { ...state, loading: true, loadingSelectedMeme: true };
    case types.GET_SINGLE_MEME_SUCCESS:
      return { ...state, loadingSelectedMeme: false, selectedMeme: payload };
    case types.GET_SINGLE_MEME_FAILURE:
      return { ...state, loadingSelectedMeme: false, error: payload.message };

    //put a single meme
    case types.UPDATE_SINGLE_MEME_REQUEST:
      return { ...state, loadingSelectedMeme: true };
    case types.UPDATE_SINGLE_MEME_SUCCESS:
      return {
        ...state,
        selectedMeme: payload,
        loadingSelectedMeme: false,
      };
    case types.UPDATE_SINGLE_MEME_FAILURE:
      return { ...state, loadingSelectedMeme: false };

    //delete a single meme:
    case types.DELETE_SINGLE_MEME_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_SINGLE_MEME_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedMeme: {},
      };
    case types.DELETE_SINGLE_MEME_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default memesListReducer;
