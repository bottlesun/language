import Axios from "axios";
import {
  LOGIN_USER
} from './types'

export const loginUser = (dataToSubmit) => {
  // 로그인 리퀘스트 reducer
  const request = Axios.post('/api/user/login', dataToSubmit)
    .then(response => response.data);

  // reducer 로 보내 사용
  return {
    type: LOGIN_USER,
    payload: request,
  }
}