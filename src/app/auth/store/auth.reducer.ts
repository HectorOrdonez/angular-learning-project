import {User} from "../user.model";

export interface State {
  user: User
}

export const initialState: State = {
  user: null
}

export function authReducer(state = initialState, action) {
  return state
}
