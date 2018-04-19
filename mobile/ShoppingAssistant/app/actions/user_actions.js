import * as User from './action_types'

export const userActions = {

  login(payload){
    return {
      type: User.LOGIN,
      payload
    }
  },

  logout(payload){
    return {
      type: User.LOGOUT,
      payload
    }
  }

}
