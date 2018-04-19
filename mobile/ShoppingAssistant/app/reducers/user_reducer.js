import * as User from '../actions/action_types'

const INITIAL_STATE = {
  logged: false
}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){

    case User.LOGIN: {
      return {
        ...state,
        logged: action.payload
      }
    }

    case User.LOGOUT: {
      return {
        ...state,
        logged: action.payload
      }
    }

    default: state
  }

  return state
}
