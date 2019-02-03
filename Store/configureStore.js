import {createStore} from 'redux'
import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'
// import manageHistoric from './Reducers/historicReducer'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))
