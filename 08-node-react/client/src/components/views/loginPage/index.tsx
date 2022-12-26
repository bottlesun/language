import React, {FormEvent} from 'react'
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {loginUser} from "../../../_actions/user_actions";
import Auth from "../../../hoc/auth";
import useInput from "../../../hooks/useInput";
import './loginPage.css';

const LoginPage = (props: any) => {
  const navigate = useNavigate();

  const {onChange, inputs} = useInput({Email: '', Password: ''});
  const {Email, Password} = inputs;
  const dispatch = useDispatch() as any;

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then((response: any) => {
        console.log(response.payload?.loginSuccess)
        if (response.payload?.loginSuccess) {
          navigate('/')
        } else {
          alert('Error')
        }
      })
  }


  return (
    <div className={'wrap'}>
      <form onSubmit={onSubmitHandler} className={'login-form'}>

        <label htmlFor="{'input-email'}">Email</label>
        <input type="email" name={'Email'} id={'input-email'} value={Email}
               onChange={onChange}/>

        <label htmlFor="{'input-password'}">Password</label>
        <input type="password" name={'Password'} id={'input-password'} value={Password}
               onChange={onChange}/>

        <button type={'submit'}>
          Login
        </button>


      </form>
    </div>
  )
}

export default  Auth(LoginPage, false);