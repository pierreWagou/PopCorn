const initialState = {historicFilm: []}

function manageHistoric(state=initialState, action) {
  let nextState
  const historicFilmIndex = state.historicFilm.findIndex(item => item.id===action.value.id)
  switch(action.type) {
    case 'TOGGLE_FILMDETAIL':
      if(historicFilmIndex==-1) {
        nextState = {
          ...state,
          historicFilm: [...historicFilm, action.value]
        }
      }
      return nextState || state
    case 'REMOVE_HISTORIC_FILM':
      if(historicFilmIndex!=-1) {
        nextState = {
          ...state,
          historicFilm: state.historicFilm.filter((item, index) => index!=historicFilmIndex)
        }
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
