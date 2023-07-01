import actions from './actions'

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || null),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.auth:
      return { ...state, user: action.user }
    default:
      return state
  }
}

export default reducer
