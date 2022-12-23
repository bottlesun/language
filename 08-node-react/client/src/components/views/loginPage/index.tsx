import {response} from "express";
import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import './loginPage.css';
import useInput from "../../../hooks/useInput";
import {useDispatch} from 'react-redux';
import {loginUser} from "../../../_actions/user_actions";
import {combineReducers} from 'redux'

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>

const LoginPage = (props: any) => {
  const {onChange, inputs} = useInput({Email: '', Password: ''});
  const {Email, Password} = inputs;

  const dispatch = useDispatch() as any;


  const onsubmitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email', Email);
    console.log('Password', Password);

    let body = {
      email: Email,
      password: Password
    }
    // redux - useDispatch 를 이용해서 action 을 할 수 있다.
    dispatch(loginUser(body)).then((response: any) => {
      if (response.payload.loginSuccess) {
        props.history.push('/')
      } else {
        alert('Error')
      }
    })

  }, [Email, Password]);

  return (
    <div className={'wrap'}>
      <form onSubmit={onsubmitHandler} className={'login-form'}>

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
  );
};

export default LoginPage;
