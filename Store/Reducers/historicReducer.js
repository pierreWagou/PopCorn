const initialState = {historicFilm: []}

function manageHistoric(state=initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_FILMDETAIL':
      nextState = {
        ...state,
        historicFilm: [...historicFilm, action.value]
      }
      return nextState || state
    case 'REMOVE_HISTORIC_FILM':
      nextState = {
        ...state,
        historicFilm: state.historicFilm.filter((item, index) => index!=historicFilmIndex)
      }
      return nextState || state
    case 'RESET_HISTORIC':
      nextState = {
        ...state,
        historicFilm: []
      }
      return nextState || state
    default:
      return state
  }
}

export default manageHistoric
