import {
  LOGIN_USER
} from '../_actions/types'

export default function (prevState = {}, action) {
  switch (action.type) { // switch 으로 쓰는 이유는 key 값을 다르게 하기 위해서 처리
    case LOGIN_USER :
      return {...prevState, loginSuccess: action.payload}

    default :
      return prevState;
  }
}