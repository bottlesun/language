import {ActionTypes} from '../_actions/types'
import {Action} from "../interfaces/dispacth.interfaces";

const {LOGIN_USER, REGISTER_USER, AUTH_USER} = ActionTypes;

export default function userReducer(prevState = {}, action: Action) {
  switch (action.type) { // switch 으로 쓰는 이유는 key 값을 다르게 하기 위해서 처리
    case LOGIN_USER :
      return {...prevState, loginSuccess: action?.payload}

    case REGISTER_USER :
      return {...prevState, register: action?.payload}

    case AUTH_USER :
      return {...prevState, userData: action?.payload}

    default :
      return prevState;
  }
}