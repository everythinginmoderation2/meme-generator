import {combineReducers} from 'redux'
import memesListReducer from './memesList.reducer'

export default combineReducers({
    memesListData: memesListReducer
})