import Axios from "axios";
import {ActionTypes} from './types'

const {LOGIN_USER, REGISTER_USER,AUTH_USER} = ActionTypes;


export const loginUser = (dataToSubmit: any) => {
  // 로그인 리퀘스트 reducer
  const request = Axios.post('/api/user/login', dataToSubmit)
    .then(response => response.data)// reducer 로 보내 사용
  return {
    type: LOGIN_USER,
    payload: request,
  }
}

export const registerUser = (dataToSubmit: any) => {
  // 로그인 리퀘스트 reducer
  const request = Axios.post('/api/user/register', dataToSubmit)
    .then(response => response.data)// reducer 로 보내 사용
  return {
    type: REGISTER_USER,
    payload: request,
  }
}

export const auth = () => {
  // auth actions
  const request = Axios.get('/api/user/auth')
    .then(response => response.data)// reducer 로 보내 사용
  return {
    type: AUTH_USER,
    payload: request,
  }
}