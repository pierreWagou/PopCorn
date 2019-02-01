import {createStore} from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import manageHistoric from './Reducers/historicReducer'

export default createStore(toggleFavorite, manageHistoric)
